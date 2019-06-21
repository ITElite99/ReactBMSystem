const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //按需加载 (如果加载全部的antd组件样式会造成前端性能隐患)
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true
   }),
   //自定义主题：配置主题，less相关的函数addLessLoader来加载less样式
   addLessLoader({
       javascriptEnabled: true,
       modifyVars: { '@primary-color': '#1DA57A' },
    }),
 );