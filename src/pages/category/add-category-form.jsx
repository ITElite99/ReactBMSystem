import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
const { Item } = Form;
const { Option } = Select;

class AddCategoryForm extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired
    };
    // 选中所属分类后 change事件
    handleChange = () => {

    };
    // 验证输入的分类名称是否已经存在
    // 自定义校验：callback必须调用
    validator = (rule, value, callback) => {
        if(!value){
            return callback('请输入分类名称');
        }
        const res = this.props.categories.find((category) => category.name === value);
        if(res){
            callback('输入的分类名称已经存在，请重新输入');
        }else{
            callback();
        }
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const { categories } = this.props; // 所属分类数据源

        return <Form>
            <Item label="所属分类">
                {
                    getFieldDecorator(
                        'parentID',{ initialValue: '0' }
                    )(
                        <Select style={{ width: '100%' }} onChange={this.handleChange}>
                            <Option value="0" key="0">一级分类</Option>
                            {
                                //动态获取所属分类
                                categories.map((category) => {
                                    return <Option value={category._id} key={category._id} >{category.name}</Option>
                                })
                            }
                        </Select>
                    )
                }
            </Item>
            <Item label="分类名称">
                {
                    getFieldDecorator(
                        'categoryName',{
                            rules: [{ validator: this.validator }]
                        }
                    )(
                        <Input placeholder="请输入分类名称"/>
                    )
                }
            </Item>
        </Form>
    }
}
//经过 Form.create 包装的组件将会自带 this.props.form 属性
export default Form.create()(AddCategoryForm);