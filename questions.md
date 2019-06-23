1、const Item = Form.Item;放在哪里？

Qa：不放在render里面每次渲染都会重新定义，放在全局，缓存一次

2、<BrowserRouter>开发文档中有，项目还没有用到

Qa：引入react-router-dom中的BrowserRouter，重命名为Router

3、less引入的位置怎么看？是在index.js 而不是html或者app.jsx

Qa：公共的在index.js或者主组件中引入，非公共的样式，放在对应的组件中

4、路由组件的三个属性：history、location、match外，添加form属性的原理是什么，即
export default Form.create()(Login);不理解

Qa：经 Form.create() 包装过的组件会自带 this.props.form 属性

5、Form表单按钮点击排队显示

Qa：添加标志位，在message.error的回调函数中重置标志位
    
    `handleing = false;
     
     if (this.handleing) return;
     this.handleing = true;
     
      message.error("网络出现异常，请刷新重试！", 2, () => {
                         //两秒后执行这个函数  可以继续点击这个按钮
                         this.handleing = false;
                     });`
                     
6、什么时候用工厂模式、什么时候用jsx(整理)

7、侧边导航：为什么点击侧边导航的按钮时会触发两次render?  生命周期不是很熟悉！！