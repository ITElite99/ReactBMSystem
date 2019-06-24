/**
 * 主页头部主组件：HeaderMain
 * 非路由组件
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyButton from '../my-button';
import {getItem, removeItem} from '../../utils/storage-tools';
import { Modal } from 'antd';

import dayjs from 'dayjs';
import { reqWeather } from  '../../api';

import menuList from '../../config/menu-configs';



import './index.less';
const { confirm } = Modal;

class HeaderMain extends Component {

    state = {
        systemTime: Date.now(),
        weather: '晴',
        weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
    };

    componentWillMount() {
        // 读取用户名
        this.username = getItem().username;
        // 初始化时：获取标题
        // 通过url的地址栏的地址来获取地址
        this.title = this.getTitle(this.props);
    }

    async componentDidMount() {
        setInterval(() => {
            this.setState({
                systemTime: Date.now()
            });
        },1000);

        // 天气请求
        const result = await reqWeather();

        if(result){
            this.setState(result);
        }
    }

    // 更新的时候获取标题
    // nextProps是更新后的地址
    componentWillReceiveProps(nextProps) {
        this.title = this.getTitle(nextProps);
    }

    logout = () => {
        confirm({
            title: '您确认要退出登录吗？',
            okText: '确认',
            cancelText: '取消',
            // 踩坑：这里要修改成箭头函数，否则里面的this指向会有问题
            onOk: () => {
                // 1、先清除本地缓存数据
                removeItem();
                // 2、退出登录：Cannot read property 'props' of undefined
                // HeaderMain不是路由组件 需要通过withRouter进行包装
                this.props.history.replace('/login');
            }
        });
    };

    // 获取title
    getTitle = (nextProps) => {
        //地址栏地址
        const { pathname } = nextProps.location;
        for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i];
            if(menu.children){ // 二级菜单
                for(let j = 0; j < menu.children.length; j++){
                    const item = menu.children[j];
                    if(item.key === pathname){
                        return item.title;
                    }
                }
            }else{
                if(menu.key === pathname){ // 一级菜单
                    return menu.title;
                }
            }
        }

    };

    render(){

        const { systemTime, weather, weatherImg } = this.state;
        return <div>
            <div className="header-main-top">
                <span>欢迎，{this.username}</span>
                <MyButton onClick={this.logout}>退出</MyButton>
            </div>
            <div className="header-main-bottom">
                <span className="header-main-left">{this.title}</span>
                <div className="header-main-right">
                    <span>{dayjs(systemTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <img src={weatherImg} alt="weather"/>
                    <span>{weather}</span>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(HeaderMain);