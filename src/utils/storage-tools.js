const USER_KEY = "USER_KEY";
const USER_TIME = 'USER_TIME';
// 到期时间
const EXPIRES_IN = 1000 * 3600 * 24 * 7;

// 获取
export const getItem = function(){
    const startTime = localStorage.getItem(USER_TIME);
    //如果数据已经失效了
    if( Date.now() - startTime > EXPIRES_IN ){
        /*
            const定义的removeItem() 函数是不能提升的，但是，引入模块的时候，
            会把文件中的定义都执行完，当真正调用getItem()函数的时候，removeItem()
            已经定义完成。
         */
        removeItem();
        return {};
    }
    //数据还未失效
    return JSON.parse(localStorage.getItem(USER_KEY));
};

// 存储设置
export const setItem = function(data){
    // 第一次登录时间存储
    localStorage.setItem(USER_TIME, Date.now() );
    //登录数据存储
    localStorage.setItem(USER_KEY, JSON.stringify(data))
};

//移除
export const removeItem = function () {
    //清除时间
    localStorage.removeItem(USER_KEY);
    //清除数据
    localStorage.removeItem(USER_TIME);
};