import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';
import MyButton from '../../components/my-button';
import { reqCategories, reqAddCategory, reqUpdateCategoryName } from '../../api';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name';
import './index.less';

export default class Category extends Component {

    // 初始化状态: 数据列表为空
    state = {
        categories: [], // 一级分类数据
        subCategories: [], // 二级分类数据
        isShowSubCategories: false, // 显示二级数据
        isShowAddCategory: false, // 显示添加品类
        isShowUpdateCategoryName: false,  // 显示修改分类名称
        isLoading: true // 显示加载
    };

    //要添加，form组件传参：this.category.name
    category = {};

    // 动态获取列表数据，在渲染之后获取一次
    componentDidMount() {
        /*const result = await reqCategories('0');// 0-一级
        if(result){
            this.setState({
                categories: result
            })
        }*/
        this.fetchCategories('0');
    }

    //模态对话框显示/隐藏切换设置
    toggleDisplay = (stateName, stateValue) => {
        return () => {
            this.setState({
                [stateName]: stateValue
            });
        }
    };

    // 添加品类
    // 1、写好表单结构 表单验证
    addCategory = () => {
        // 2、收集表单数据
        const { form } = this.addCategoryForm.props;
        // 验证一组变量
        form.validateFields( async (err, values) => {
            // 验证通过
            if(!err){
                const { categoryName, parentID } = values;
                // 3、添加分类请求
                const result = await reqAddCategory(parentID, categoryName);
                if(result){
                    // 添加成功提示
                    message.success('添加分类成功！',2);
                    // 清空表单输入框
                    form.resetFields(['categoryName','parentID']);
                    // 关闭模态框
                    const options = {
                        isShowAddCategory: false
                    }
                    // 如果是一级菜单，就添加到数组中
                    // 如果是二级菜单，当前页面的一级分类与添加的一级分类一致，就显示

                    const { isShowSubCategories } = this.state;

                    if(result.parentId === '0'){
                        options.categories = [...this.state.categories, result];
                    }else if(isShowSubCategories && result.parentId === this.parentCategory._id){
                        options.subCategories = [...this.state.subCategories, result];
                    }
                    // 将关闭模态框和一级数据添加到数组中的操作 统一添加到状态值中
                    this.setState(options);

                }
            }
        })
    };

    // 点击修改名称弹出模态对话框
    saveCategory = (category) => {
        return () => {
            // 保存要更新的分类数据
            this.category = category;
            // 显示修改模态框 更新状态state
            this.setState({
                isShowUpdateCategoryName: true
            })
        }
    };
    // 点击修改名称的取消按钮
    hideUpdateCategoryName = () => {
        // 清空弹出框表单的值，这样下次就会重新初始化对话框中的值,不会再显示之前修改了但是取消的值
        this.updateCategoryNameForm.props.form.resetFields(['categoryName']);
        // 隐藏对话框 修改状态
        this.setState({
            isShowUpdateCategoryName: false
        });
    };
    // 更新数据
    updateCategoryName = () => {
        // 收集表单数据
        const { form } = this.updateCategoryNameForm.props;
        // 验证表单数据
        form.validateFields(async (err, values) => {
            if(!err){
                // 获取当前修改后的值
                const { categoryName } = values;
                // 获取当前待修改数据的ID值
                const categoryID = this.category._id;
                // 发送修改品类名称的请求
                const result = await reqUpdateCategoryName(  categoryID, categoryName);
                // 返回结果
                if(result){
                    console.log(this);
                    // 当前选中修改内容的数据的Id
                    const { parentId } = this.category;

                    // 默认：一级菜单
                    // 当前修改后的所有数据
                    let categoryData = this.state.categories;
                    // 一级菜单的状态名称
                    let stateName = 'categories';

                    // 如果不是一级菜单 是二级菜单
                    if( parentId !== '0' ){
                        categoryData = this.state.subCategories;
                        stateName = 'subCategories';
                    }

                    //不想修改原数据
                    const categories = categoryData.map((category) => {
                        let { _id, name, parentId } = category;
                        //找到对应Id的category修改分类名称
                        if(_id === categoryID){
                            name = categoryName;
                            return {
                                _id,
                                name,
                                parentId
                            }
                        }
                        return category;
                    });

                    // 清空表单项目
                    form.resetFields(['categoryName']);
                    message.success('修改分类名称成功',2);

                    //关闭对话框，更新数据
                    this.setState({
                        isShowUpdateCategoryName: false,
                        [stateName]:categories
                    });
                }
            }else{
                console.log("修改分类名称未通过，请重新确认");
                message.error("修改分类名称未通过，请重新确认");
            }
        })
    };

    // 点击显示查看子品类
    showSubCategory = (category) => {
        return () => {
            // 保存一级分类数据
            this.parentCategory = category;
            // 请求二级分类数据
            this.fetchCategories(category._id);
        }
    };

    //请求数据
    fetchCategories = async (parentId) => {
        //显示加载
        this.setState({
            isLoading: true
        });
        const result = await reqCategories(parentId);
        if(result){
            //请求的是一级分类数据
            if(parentId === '0'){
                this.setState({
                    categories: result
                })
            }else{
                //请求的是二级分类数据
                this.setState({
                    subCategories: result,
                    isShowSubCategories: true
                })
            }
        }
        //加载结束
        this.setState({
            isLoading: false
        });
    };

    goBack = () => {
        this.setState({
            isShowSubCategories: false
        })
    };

    render() {

        const {
            categories,
            subCategories,
            isShowSubCategories,
            isShowUpdateCategoryName,
            isShowAddCategory,
            isLoading
        } = this.state;
        // 表头
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                // dataIndex: 'operation',//dataIndex代表的是render渲染的列名，如果不指定，那么category就是{...}
                className: 'category-operation',
                render: category => {
                    return <div>
                        <MyButton onClick={this.saveCategory(category)}>修改名称</MyButton>
                        {
                            isShowSubCategories? null : <MyButton onClick={this.showSubCategory(category)}>查看其子品类</MyButton>
                        }

                    </div>
                }
            }
        ];

        return <Card title={isShowSubCategories?<div><MyButton onClick={this.goBack}>一级分类</MyButton><Icon type="arrow-right" />&nbsp;{this.parentCategory.name} </div>:"一级分类列表"}
                     extra={<Button type="primary" onClick={this.toggleDisplay('isShowAddCategory', true)}><Icon type="plus"/>添加品类</Button>}>
            <Table
                columns={columns} // 表头
                dataSource={isShowSubCategories?subCategories:categories} // 表格数据
                bordered
                pagination={{ // 组件属性
                    showSizeChanger: true,
                    pageSizeOptions: ['3','5','10','20','50'],
                    defaultPageSize: 3,
                    showQuickJumper: true
                }}
                rowKey='_id'
                loading={isLoading}
            />
            <Modal
                title="添加分类"
                visible={isShowAddCategory}
                onOk={this.addCategory}
                onCancel={this.toggleDisplay('isShowAddCategory', false)}
                okText="确认"
                cancelText="取消"
            >
                {/*
                    获取添加分类表单数据
                    wrappedComponentRef={( form ) => { this.addCategoryForm = form }}
                */}
                <AddCategoryForm categories={categories} wrappedComponentRef={( form ) => { this.addCategoryForm = form }} />
            </Modal>

            <Modal
                title="修改分类名称"
                visible={isShowUpdateCategoryName}
                onOk={this.updateCategoryName}
                onCancel={this.hideUpdateCategoryName}
                okText="确认"
                cancelText="取消"
                width={300}
            >
                {/*
                    通过wrappedComponentRef 收集表单数据
                    wrappedComponentRef={( form ) => { this.updateCategoryNameForm = form }}
                */}
                <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef={( form ) => { this.updateCategoryNameForm = form }} />
            </Modal>


        </Card>
    }
}