/**
 *  应用根（主）路由组件
 *  1、用户登录 Login
 *  2、主页 Admin
 *
 *  前端路由：route
 */


import React,{ Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//引入前端路由
import Login from './pages/login';
import Admin from './pages/admin';

export default class App extends Component {

    render(){
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Admin}/>
            </Switch>
            );
    }
}


