import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import {Icon, Menu} from "antd";
import menuList from "../../config/menu-configs";
import logo from "../../assets/image/logo.png";
import './index.less';

const { SubMenu, Item } = Menu;

class LeftNav extends Component {
    static propTypes = {
        collapsed: PropTypes.bool.isRequired
    };
    //创建Item结构
    createItem = ( menu ) => {
        return <Item key={menu.key}>
            <Link to={menu.key}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
            </Link>
        </Item>
    };

    //在渲染之前完成菜单结构的组装
    componentWillMount = () => {
        //获取当前路径名称
        const { pathname } = this.props.location;

        this.menus = menuList.map( (menu) => {
            //判断是否包含children: 是-二级菜单  否-一级菜单
            const children = menu.children;
            if(children){ // 二级菜单
                return <SubMenu
                    key={menu.key}
                    title={
                        <span>
                            <Icon type={menu.icon} />
                            <span>{menu.title}</span>
                        </span>
                    }
                >
                    {
                        children.map((item) => {
                            // 二级菜单项目的key : item.key
                            // 路由路径location的pathname: pathname
                            // 二级菜单
                            if(item.key === pathname){
                               this.openKey = menu.key;
                            }
                            return this.createItem(item);
                        })
                    }
                </SubMenu>
            }else{ // 一级菜单
                return this.createItem(menu);
            }
        } )

        //初始化绿色选中样式菜单
        this.selectedKey = pathname;
        console.log(this.selectedKey);
    };


    render() {

        const { collapsed } = this.props;
        console.log(collapsed);
        return <div>
            <Link className="left-nav-logo" to="/home">
                <img src={logo} alt="logo"/>
                <h1 style={{display: collapsed? 'none':'block'}}>硅谷后台</h1>
            </Link>
            <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} mode="inline" defaultOpenKeys={[this.openKey]}>
                {
                    //根据配置菜单配置文件，组装菜单结构
                    this.menus
                }
            </Menu>
       </div>;
   }
}
//LeftNav非路由组件，通过高阶组件withRouter包装后，可以使用三大属性：history、location、match
export default withRouter(LeftNav);