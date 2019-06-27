import React, { Component } from 'react';
import { Card, Icon, Form, Input, Cascader, InputNumber, Button } from 'antd';
import { reqCategories, reqAddProduct, reqUpdateProduct } from '../../../api';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import RichTextEditor from './rich-text-editor';
import PicturesWall from './picture-wall';
// 注意样式表文件的放置的位置
import './index.less';

const { Item } = Form;

class SaveUpdate extends Component {

    // 初始化状态数据
    state = {
        options: []
    };

    /*
        需求：组件外想要获取组件内数据
        ref获取普通标签，就是获取到真实的DOM元素
           获取组件，就是获取组件的实例对象
     */
    richTextEditorRef = React.createRef();

    // (公共方法)获取商品分类数据（一级数据、二级数据）
    getCategories = async (parentId) => {
        const result = await reqCategories(parentId);
        if(result){
            // 获取的是一级分类的数据
            if(parentId === '0'){
                this.setState({
                    options: result.map((item) => {
                        return {
                            value: item._id,
                            label: item.name,
                            isLeaf: false //箭头
                        }
                    })
                });
            }else{
                // 获取的是二级分类的数据
                this.setState({
                    // 遍历所有一级分类对象 当前一级分类的id和所有的一级分类中的某一个Id相等
                    // 那么将当前获取的二级分类数据作为其子对象
                    options: this.state.options.map((item) => {
                        if( item.value === parentId ){
                            item.children = result.map((item) => {
                                return {
                                    value: item._id,
                                    label: item.name
                                }
                            });
                        }
                        return item;
                    })

                });
            }
        }
    };

    // 初始化，动态获取分类数据
    componentDidMount() {
        // 请求一级分类数据
        this.getCategories('0');

        // 场景：修改商品信息
        // 获取商品修改前数据
        // 一级 pCategoryId：'0' categoryId：一级分类Id
        // 二级 pCategoryId：一级分类Id  categoryId：二级分类Id
        const product = this.props.location.state;
        const categoriesId = [];
        if(product){
            if(product.pCategoryId !== '0'){
                categoriesId.push(product.pCategoryId);
                // 请求二级分类数据
                this.getCategories(product.pCategoryId);
            }
            categoriesId.push(product.categoryId);
        }
        // 商品的分类Id,可能是：一级/二级 、 一级
        this.categoriesId = categoriesId;
    }

    // 获取二级数据
    loadData = async selectedOptions => {
        // 获取数组最后一项
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // 显示loading图标
        targetOption.loading = true;
        // 发送请求，获取二级分类数据
        const result = await reqCategories(targetOption.value);
        if(result){
            // 不显示loading图标
            targetOption.loading = false;
            // 二级分类数据
            targetOption.children = result.map((item) => {
                return {
                    label: item.name,
                    value: item._id
                }
            });
            this.setState({
                options: [...this.state.options],
            });
        }
    };
    // 表单提交数据
    addProduct = (e) => {
        // 阻止默认事件(默认事件指的是：点击提交会刷新页面)
        e.preventDefault();
        // 统一搜集表单数据
        this.props.form.validateFields( async (err, values) => {
            if(!err){
                const { name, desc, price, categoriesId } = values;
                let pCategoryId = '0'; // 一级分类id
                let categoryId = ''; // 二级分类id

                if( categoriesId.length === 1 ) { // 一级分类
                    categoryId = categoriesId[0];
                }else{
                    pCategoryId = categoriesId[0];
                    categoryId = categoriesId[1];
                }
                // 富文本内容获取
                const { editorState } = this.richTextEditorRef.current.state;
                const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));

                // 场景：商品数据修改后提交表单数据
                const product = this.props.location.state;
                const params = { name, desc, price, categoryId, pCategoryId, detail };

                let promise = null;
                if(product){ // 修改提交保存
                    // 图片保存接口有参数id
                    params._id = product._id;
                    promise = reqUpdateProduct(params);
                }else{
                    promise = reqAddProduct(params);
                }
                // 等待请求
                const result = await promise;
                // 请求成功
                // 组件跳转，卸载原来的组件，重新初始化加载新的组件，所以不需要清空原来的组件
                console.log(result);
                if(result){
                    this.props.history.push('/product/index');
                }
            }
        });
    };

    // 回退按钮
    goBack = () => {
        this.props.history.goBack()
        // this.props.history.replace('/product/index')
    };

    render() {
        const { options } = this.state;
        const { getFieldDecorator } = this.props.form;
        // 获取商品修改前内容
        const product = this.props.location.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 } // 靠左边空白有两份
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 } // 输入框占的份数
            }
        };
        return <Card
            title={
                <div className="product-title">
                    <Icon type="arrow-left" className="arrow-icon" onClick={this.goBack} />
                    <span>添加商品</span>
                </div>
            }
            >
            <Form {...formItemLayout} onSubmit={this.addProduct}>
                <Item label="商品名称">
                    {
                        getFieldDecorator(
                            'name',{
                                rules: [{required: true, message: '请输入商品名称'}],
                                initialValue: product? product.name : ''
                            }
                        )(
                            <Input placeholder="请输入商品名称"/>
                        )
                    }
                </Item>
                <Item label="商品描述">
                    {
                        getFieldDecorator(
                            'desc',{
                                rules: [{required: true, message: '请输入商品描述'}],
                                initialValue : product ? product.desc : ''
                            }
                        )(
                            <Input placeholder="请输入商品描述"/>
                        )
                    }
                </Item>
                <Item label="选择分类" wrapperCol={{span: 5}}>
                    {
                        getFieldDecorator(
                            'categoriesId',{
                                rules: [{required: true, message: '请选择分类'}],
                                initialValue: this.categoriesId
                            }
                        )(
                            <Cascader
                                options={options}
                                loadData={this.loadData}
                                changeOnSelect
                                placeholder="请选择分类"
                            />
                        )
                    }
                </Item>
                <Item label="商品价格">
                    {
                        getFieldDecorator(
                            'price',{
                                rules: [{required: true, message: '请输入商品价格'}],
                                initialValue: product? product.price : ''
                            }
                        )(
                            <InputNumber
                                // 格式化数据
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\D+/g, '')}
                                className="input-number"
                            />
                        )
                    }
                </Item>
                <Item label="商品图片">
                    <PicturesWall imgs={ product ? product.imgs : []} id={product ? product._id : ''}/>
                </Item>
                <Item label="商品详情"  wrapperCol={{ span: 20 }}>
                    <RichTextEditor ref={this.richTextEditorRef} detail={product ? product.detail : ''}/>
                </Item>
                <Item>
                    <Button type="primary" className="add-product-btn" htmlType="submit">提交</Button>
                </Item>
            </Form>
        </Card>
    }
}

export default Form.create()(SaveUpdate);