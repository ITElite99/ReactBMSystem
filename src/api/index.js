/**
 *  请求登录组件
 *  返回值一定是成功状态的promise
 */

import ajax from "./ajax";

export const reqLogin = ( username, password ) => ajax( '/login',{ username, password }, 'post' );



