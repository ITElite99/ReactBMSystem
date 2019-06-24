/**
 * 主页头部主组件：HeaderMain
 * 非路由组件
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyButton from '../my-button';
import logo from '../../assets/image/qing.png';
import {getItem, removeItem} from '../../utils/storage-tools';
import { Modal, Button } from 'antd';



import './index.less';
const { confirm } = Modal;

class HeaderMain extends Component {


    componentWillMount() {
        //读取用户名
        this.username = getItem().username;
    }

    logout = () => {
        confirm({
            title: '您确认要退出登录吗？',
            okText: '确认',
            cancelText: '取消',
            //踩坑：这里要修改成箭头函数，否则里面的this指向会有问题
            onOk: () => {
                // 1、先清除本地缓存数据
                removeItem();
                // 2、退出登录：Cannot read property 'props' of undefined
                // HeaderMain不是路由组件 需要通过withRouter进行包装
                this.props.history.replace('/login');
            }
        });
    };



    render(){

        return <div>
            <div className="header-main-top">
                <span>欢迎，{this.username}</span>
                <MyButton onClick={this.logout}>退出</MyButton>
            </div>
            <div className="header-main-bottom">
                <span className="header-main-left">用户管理</span>
                <div className="header-main-right">
                    <span>{Date.now()}</span>
                    <img src={logo} alt="weather"/>
                    <span>晴</span>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(HeaderMain);