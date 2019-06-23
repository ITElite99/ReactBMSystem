import React, { Component } from 'react';
import MyButton from '../my-button';
import logo from '../../assets/image/qing.png';
import './index.less';

class HeaderMain extends Component {

    render(){

        return <div>
            <div className="header-main-top">
                <span>欢迎，admin</span>
                <MyButton>退出</MyButton>
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

export default HeaderMain;