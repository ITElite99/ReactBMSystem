import React, { Component } from 'react';
import { Card, Select, Input, Button, Icon, Table } from 'antd';
import MyButton from '../../../components/my-button';

import { reqProducts } from '../../../api';

import './index.less';

const { Option } = Select;

export default class Index extends Component {

    // 初始化状态 数据
    state = {
        products: [],
        isLoading: true
    };
    // 静态页面渲染完成后，动态请求数据
    async componentDidMount() {
        // 显示加载中
        this.setState({
            isLoading: true
        });
        const result = await reqProducts(1,3);
        if(result){
            this.setState({
                products: result.list
            })
        }
        // 加载结束
        this.setState({
            isLoading: false
        });
    }

    // 添加产品
    showAddProduct = () => {
        this.props.history.push('/product/saveupdate');
    };

    render() {
        const { products, isLoading } = this.state;
        // 设置表头列
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '状态',
                dataIndex: 'status',
                className: 'product-status',
                render: (status) => {
                    return status === 1
                    ? <div><Button type="primary">上架</Button>&nbsp;&nbsp;&nbsp;&nbsp;已下架</div>
                    : <div><Button type="primary">下架</Button>&nbsp;&nbsp;&nbsp;&nbsp;在售</div>
                }
            },
            {
                title: '操作',
                className: 'product-status',
                render: (product) => {
                    return <div>
                        <MyButton>详情</MyButton>
                        <MyButton>修改</MyButton>
                    </div>
                }
            }
        ];

        return <Card
            title={
                <div>
                    <Select defaultValue={0}>
                            <Option key={0} value={0}>根据商品名称</Option>
                            <Option key={1} value={1}>根据商品描述</Option>
                    </Select>
                    <Input placeholder="关键字" className="search-input" />
                    <Button type="primary">搜索</Button>
                </div>
            }
            extra={<Button type="primary" onClick={this.showAddProduct}><Icon type="plus" />添加产品</Button>}
        >
            <Table
                columns={columns}
                dataSource={products}
                bordered
                pagination={{
                   showQuickJumper: true,
                   showSizeChanger: true,
                   pageSizeOptions: ['3','5','10','20','50'],
                    defaultPageSize: 3
                }}
                rowKey='_id'
                loading={isLoading}
            />
        </Card>

    }
}