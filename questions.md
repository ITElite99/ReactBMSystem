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

Qa：工厂函数功能比较局限，所以一上来我们就【定义ES6类组件】，组件里面采用jsx的语法
创建虚拟的DOM节点。功能完成后，当组件中没有状态值的改变且没有用到生命周期函数（除了
constructor、render外），就优化为【工厂函数组件】的方式实现。

工厂函数组件：(1)组件名首字母必须大写，否则报错。(2)必须写关闭标签/,如果标签内没有
内容，写单标签，如果标签内有内容，写双标签。(3)只有一个根标签。

定义ES6类组件：默认一上来就使用ES6类组件

7、侧边导航：为什么点击侧边导航的按钮时会触发两次render?  生命周期不是很熟悉！！

Qa：原来的样式设计模式，直接用，不去研究

8、Warning: Can't perform a React state update on an unmounted component. 
This is a no-op, but it indicates a memory leak in your application. To fix, 
cancel all subscriptions and asynchronous tasks in the componentWillUnmount 
method.

Qa:清除定时器和ajax请求

9、表单请求校验异常和非异常的结果callback用return用返回？

10、api中方法的参数要跟接口文档的参数顺序一一对应吗？

11、form.validateFields什么情况会有err

12、函数返回值是一个函数，这个是高阶函数，那么是怎么执行的，函数执行定义后的结果
是什么，函数调用后的结果是什么，如：
    `toggleDisplay = (stateName, stateValue) => {
        return () => {
          this.setState({
            [stateName]: stateValue
          })
        }
      };`

13、天气请求失败默认显示晴图标和文字吗？确认一下代码。

14、postMan没有网络打不开吗？


