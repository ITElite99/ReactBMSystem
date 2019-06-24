import React, { Component } from 'react';
import { Card, Button, Icon, Table } from 'antd';
import MyButton from '../../components/my-button';
import { reqCategories } from '../../api';
import './index.less';

export default class Category extends Component {

    //初始化状态: 数据列表为空
    state = {
        categories: []
    };

    //动态获取列表数据，在渲染之后获取一次
    async componentDidMount() {
        const result = await reqCategories('0');// 0-一级
        console.log(result)
        if(result){
            const resultAddKey = result.map((item,index) => {
                item.key = index;
                return item;
            });
            this.setState({
                categories: resultAddKey
            })
        }
    }


    render() {
        //表头
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                className: 'category-operation',
                render: text => {
                    return <div>
                        <MyButton>修改名称</MyButton>
                        <MyButton>查看其子品类</MyButton>
                    </div>
                }
            }
        ];

        return <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus"/>添加品类</Button>}>
            <Table
                columns={columns} // 表头
                dataSource={this.state.categories} // 表格数据
                bordered
                pagination={{ // 组件属性
                    showSizeChanger: true,
                    pageSizeOptions: ['3','5','10','20','50'],
                    defaultPageSize: 3,
                    showQuickJumper: true
                }}
            />

        </Card>
    }
}