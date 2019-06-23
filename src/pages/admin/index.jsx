/**
 * 后台主路由组件
 */
import React, { Component } from 'react';

import { Layout } from 'antd';
import LeftNav from "../../components/left-nav";
import HeaderMain from '../../components/header-main';
import './index.less';

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
                        <div style={{ padding: 24, background: '#fff', minHeight: 500 }}  className="content-main" >
                            欢迎使用硅谷后台管理系统
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

