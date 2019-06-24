/**
 *  请求登录组件
 *  返回值一定是成功状态的promise
 */

import ajax from "./ajax";
import jsonp from 'jsonp';
import { message } from 'antd';

/**
 * 用户登录
 * @param username
 * @param password
 * @returns {*}
 */
export const reqLogin = ( username, password ) => ajax( '/login',{ username, password }, 'post' );

/**
 * 用户信息合法性校验
 * @param id
 * @returns {*}
 */
export const reqValidateUserInfo = (id) => ajax('/validate/user', { id }, 'post');

/**
 * 天气预报信息
 *      解决跨域问题：jsonp(异步)  jsonp只能发get请求
*/
export const reqWeather = function(){

    //要用一个方法包着，如果直接暴露，以上来就会被自动执行
    return new Promise((resolve, reject) => { // jsonp异步，所以要包一个Promise取到结果
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            {}, function(err, data){
                if (!err) {
                    const {dayPictureUrl, weather} = data.results[0].weather_data[0];
                    resolve({
                        weatherImg: dayPictureUrl,
                        weather
                    });
                }else{
                    message.error('请求天气信息失败，请刷新试试！');
                    resolve();//要调用，否则外面会卡死
                }
            });
    });
};

/**
 * 一级列表数据动态获取
 * @param parentId
 * @returns {*}
 */
export const reqCategories = (parentId) => ajax( '/manage/category/list',{ parentId });


