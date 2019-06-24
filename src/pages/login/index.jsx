/**
 * 用户登录路由组件
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

import { reqLogin } from '../../api/index';
import { setItem } from '../../utils/storage-tools';

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
            // callback必须调用
            // 不传参代表校验通过，传参代表校验失败
            callback();
        }
    };

    //解决异常提示的问题
    handleing = false;

    //提交表单
    handleSubmit = (e) => {
        //阻止表单默认事件
        e.preventDefault();

        if (this.handleing) return;
        this.handleing = true;

        //校验一组表单数据是否都校验通过
        //第一个参数：代表校验表单的结果，要么是异常信息{} 要么null-校验通过
        //第二个参数：值
        this.props.form.validateFields( async (error, value) => {
            if(!error){ // 校验通过
                this.handleing = false;
                const { username, password } = value;
                //发送请求
                // const result = await ajax( '/login',{ username, password }, 'post' );
                const result = await reqLogin( username, password );
                if( result ){
                    //登录成功时保存第一次登录的用户数据
                    setItem(result);
                    //跳转到admin主页 （采用代理服务器方法解决了跨域问题）
                    this.props.history.replace('/');
                }else{
                    //重置密码
                    this.props.form.resetFields(['password']);
                }
            }else{
                // 异常信息提示  显示时间
                message.error("表单校验失败！", 2, () => {
                    //两秒后执行这个函数  可以继续点击这个按钮
                    this.handleing = false;
                });
                //重置密码
                this.props.form.resetFields(['password'])
                // 校验失败
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