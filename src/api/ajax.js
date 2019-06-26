/**
 *  统一处理错误响应结果
 */
import axios from "axios";
import { message } from "antd";

export default function ajax( url, data = {}, method = 'GET' ) {
    // 初始化参数
    let reqParams = data;
    // 转换小写 请求方式，axios.get/post 大小写敏感
    method = method.toLowerCase();
    // 参数格式：
    // get-> { params: { data } }
    // post-> { data }
    if( method === 'get' ){
        reqParams = {
            params: reqParams
        }
    }
    // 发送请求
    return axios[method]( url,reqParams )
        .then((res) => {
            const { data } = res;
            if( data.status === 0 ){ // 成功
                // 请求成功并且状态是成功  会有返回数据
                // 注意返回结果如果为undefined就给一个{}
                return data.data || {};
            }else{ // 失败
                message.error(data.msg, 2);
            }
        })
        // 请求失败：网络错误，服务器内部错误等
        .catch((err) => {
            message.error("网络出现异常，请刷新重试！", 2);
        });
}
