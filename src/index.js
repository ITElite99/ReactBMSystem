/**
 *  入口js文件
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
// 引入react-router-dom中的BrowserRouter，重命名为Router
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './assets/less/index.less';

ReactDOM.render(<Router>
    <App />
</Router>, document.getElementById("root"));
