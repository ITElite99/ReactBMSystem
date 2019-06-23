/**
 * @description 按钮组件
 * （1）使用工厂函数：没有状态变化、没有使用生命周期函数（除了constructor、render）
 * （2）组件内包含的内容会挂载到组件的props的children
 *      如console.log(props); // { children: '退出' }
 */

import React from 'react';
import './index.less';

export default function MyButton( props ) {
    return <button className="my-button" {...props} />
}
