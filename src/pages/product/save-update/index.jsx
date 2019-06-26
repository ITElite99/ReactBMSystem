import React, { Component } from 'react';
import { Card, Icon, Form, Input, Cascader, InputNumber, Button } from 'antd';

import './index.less';
import { reqCategories } from '../../../api';
import RichTextEditor from './rich-text-editor';

const { Item } = Form;

export default class SaveUpdate extends Component {

    // 初始化状态数据
    state = {
        options: []
    };

    //动态获取一级分类的数据
    async componentDidMount() {
       const result = await reqCategories('0');
       if(result){
           this.setState({
               options: result.map((item) => {
                   return {
                       value: item.name,
                       label: item.name,
                       isLeaf: false //箭头
                   }
               })
           });
       }
    }

    // 获取二级数据
    loadData = async selectedOptions => {
        // 获取数组最后一项
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // 显示loading图标
        targetOption.loading = true;
        // 发送请求，获取二级分类数据
        const result = await reqCategories(targetOption.value);
        if(result){
            // 不显示loading图标
            targetOption.loading = false;
            // 二级分类数据
            targetOption.children = result.map((item) => {
                return {
                    label: item.name,
                    value: item._id
                }
            });
            this.setState({
                options: [...this.state.options],
            });
        }
    };
    addProduct = (e) => {
        //阻止默认事件(默认事件指的是：点击提交会刷新页面)
        e.preventDefault();
    };

    render() {
        const { options } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 } // 靠左边空白有两份
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 } // 输入框占的份数
            }
        };
        return <Card
            title={
                <div className="product-title">
                    <Icon type="arrow-left" className="arrow-icon" />
                    <span>添加商品</span>
                </div>
            }
            >
            <Form {...formItemLayout} onSubmit={this.addProduct}>
                <Item label="商品名称">
                    <Input placeholder="请输入商品名称"/>
                </Item>
                <Item label="商品描述">
                    <Input placeholder="请输入商品描述"/>
                </Item>
                <Item label="选择分类" wrapperCol={{span: 5}}>
                    <Cascader
                        options={options}
                        loadData={this.loadData}
                        changeOnSelect
                        placeholder="请选择分类"
                    />
                </Item>
                <Item label="商品价格">
                <InputNumber
                    // 格式化数据
                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/￥\s?|(,*)/g, '')}
                    className="input-number"
                />
                </Item>
                <Item label="商品详情" wrapperCol={{ span: 20 }}>
                    <RichTextEditor />
                </Item>
                <Item>
                    <Button type="primary" className="add-product-btn" htmlType="submit">提交</Button>
                </Item>
            </Form>
        </Card>
    }
}