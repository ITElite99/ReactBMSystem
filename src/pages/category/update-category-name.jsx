import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
const { Item } = Form;

class UpdateCategoryNameForm extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired
    };

    validator = (rule, value, callback) => {
        if(!value){
            callback('请输入分类名称');
        }else if(value === this.props.categoryName){
            callback('不能输入与修改前一样的名称');
        }else{
            callback();
        }
    };

    render() {
        //高阶函数，给字段添加校验设置
        const { getFieldDecorator } = this.props.form;

        return <Form>
            <Item>
                {
                    getFieldDecorator(
                        'categoryName',
                        {
                            initialValue: this.props.categoryName,
                            rules: [{
                                validator: this.validator
                            }]
                        }
                    )(
                    <Input />
                    )
                }
            </Item>
        </Form>
    }
}
export default Form.create()(UpdateCategoryNameForm);