import React,{ Component } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteProductImg } from '../../../api';

export default class PicturesWall extends Component {
    // 初始化状态
    state = {
        // 预览图显示和隐藏
        previewVisible: false,
        // 预览图
        previewImage: '',
        fileList: this.props.imgs.map((img, index) => { // 图片资源列表
            return {
                uid: -index, // 样例数据如：'-1'
                name: img, // 图片名称
                status: 'done', // 已经上传完成的状态
                url: `http://localhost:5000/upload/${img}`, // 上传成功后，在服务器中保存的路径
            }
        })
    };

    // 取消预览
    handleCancel = () => this.setState({ previewVisible: false });

    // 点击预览
    handlePreview = async file => {
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    // 上传图片
    handleChange = ({ file, fileList }) => {
        // 分3段上传
        if(file.status === 'uploading'){
            // 上传中，不做操作
        }else if(file.status === 'done'){
            // 上传成功
            message.success('图片上传成功!', 2);
        }else if(file.status === 'error'){
            // 上传失败
            message.error('图片上传失败!', 2);
        }else if(file.status === 'removed'){
            // 删除图片
            // 获取当前图片的id 和 图片文件名字
            const id = this.props.id;
            const name = file.name;

            // console.log(file)

            // 发送删除上传图片请求
            const result = reqDeleteProductImg(name, id);
            console.log(result);
            if(result){
                message.error('图片删除成功!', 2);
            }
        }
        // 重新设置状态值，更新渲染上传图片
        this.setState({ fileList })
    };

    render() {
        // previewVisible：是否预览显示状态
        // previewImage：预览图片路径，如http://localhost:5000/upload/image-1561648303235.jpg
        // fileList：图片文件资源
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    // 上传的服务器是http://localhost/5000
                    // 如果写上完整地址就会产生跨域问题，所以直接写/，代表当前服务器
                    action="/manage/img/upload"
                    listType="picture-card"
                    // 展示图片文件
                    fileList={fileList}
                    // 点击预览回调
                    onPreview={this.handlePreview}
                    // 点击上传或者删除的回调
                    onChange={this.handleChange}
                    // 请求参数   ----
                    data={{
                        id: this.props.id
                    }}
                    name='image'
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

