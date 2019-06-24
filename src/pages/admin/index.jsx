/**
 * 后台主路由组件
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav";
import HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/storage-tools';
import { reqValidateUserInfo } from '../../api';

import Home from '../home';
import Category from '../category';
import Product from '../product';
import Role from '../role';
import User from '../user';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Pie from '../charts/pie';

const { Header, Content, Footer, Sider } = Layout;


export default class Admin extends Component {

    state = {
        collapsed: false,
    };
    //折叠
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    //登录校验
    componentWillMount() {
        //获取第一次登录保存在localstorage中的用户数据
        const user = getItem();
        //如果存在，说明用户有登录本地缓存记录

        //此处待优化功能，如果是登入成功的就不需要再做验证  redux

        if(user && user._id){
            //1、向服务器发送请求(服务器代码手动添加)，
            //2、api函数定义
            //3、判断用户信息是否合法，user._id是唯一值
            const result = reqValidateUserInfo(user._id);
            //如果有找到,说明用户数据合法，直接登录成功
            if(result) return;
        }
        //未找到登录信息，跳转到登录页面
        this.props.history.replace('/login');
    }


    //渲染
    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <LeftNav collapsed={collapsed} />
                </Sider>
                <Layout>
                    {/*style{{}}中不能写单位*/}
                    <Header style={{ background: '#fff', padding: 0, minHeight: 100 }} >
                        <HeaderMain />
                    </Header>
                    <Content style={{ margin: '25px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 500 }} >
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/category" component={Category}/>
                                <Route path="/product" component={Product}/>
                                <Route path="/user" component={User}/>
                                <Route path="/role" component={Role}/>
                                <Route path="/charts/line" component={Line}/>
                                <Route path="/charts/bar" component={Bar}/>
                                <Route path="/charts/pie" component={Pie}/>
                                <Redirect to="/home" />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

