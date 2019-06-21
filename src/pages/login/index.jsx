/**
 * 用户登录路由组件
 *
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

//引入图片资源，在react脚手架中图片必须引入才会打包
import logo from './logo.png';
import './index.less';

const Item = Form.Item;

class Login extends Component {

    //自定义校验规则
    //callback必须调用
    //rule是一个对象 value是输入框的值 callback是回调函数
    validator = ( rule, value, callback ) => {

        const name = rule.fullField === 'username'? '用户名':'密码';
        if(!value){
            //没有输入
            callback(`必须输入${name}!`);
        }else if(value.length<4){
            callback(`${name}必须大于4位`);
        }else if(value.length>15){
            callback(`${name}必须小于15位`);
        }else if(!/^[a-zA-Z_0-9]+$/.test(value)){
            callback(`${name}只能包含英文字母、下划线、数字`);
        }else{
            //callback必须调用
            //不传参代表校验通过，传参代表校验失败
            callback();
        }
    };

    //提交表单
    handleSubmit = (e) => {
        //阻止表单默认事件
        e.preventDefault();
        //校验一组表单数据是否都校验通过
        //第一个参数：代表校验表单的结果，要么是异常信息{} 要么null-校验通过
        //第二个参数：值
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            if(!error){//校验通过
                const { username, password } = value;
                //发送请求
                console.log('登录请求：',username, password);
            }else{
                //校验失败
                console.log('登录表单校验失败：', error);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return <div className="login">
            <header className="login-header">
                <img src={logo} alt="logo"/>
                <h1>React项目: 后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登陆</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>
                        {
                            //表单校验方式一：
                            getFieldDecorator( 'username', {
                                rules: [
                                    /*{required: true, message: '请输入用户名!'},
                                    {min: 4, message: '用户名必须大于4位'},
                                    {max: 15, message: '用户名必须小于15位'},
                                    {pattern: /^[a-zA-Z_0-9]+$/, message: '用户名只能包含英文、字母、下划线' }*/
                                    {
                                        validator: this.validator
                                    }
                                    ]
                            }
                            )(  //组件
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       className="login-input" placeholder="用户名"/>
                            )
                        }

                    </Item>
                    <Item>
                        {
                            getFieldDecorator( 'password',
                                //表单校验二：
                                {
                                    rules: [
                                        {
                                            validator: this.validator
                                        }
                                    ]
                                }
                            )(
                                //组件
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       className="login-input" type="password" placeholder="密码"/>
                            )
                        }
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Item>
                </Form>
            </section>
        </div>
    }
}

//给路由添加form属性
//返回值是一个包装组件  <Form(Login)> <Login> </Form(Login))
//通过Form(Login)包装组件向Login组件中传递form属性
export default Form.create()(Login);