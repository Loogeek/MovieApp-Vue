
使用Vue+Vue-router+Webpack搭建的豆瓣电影WebApp应用
======


简介:
----
- 该项目使用`Vue.js`通过组件化开发完成；
- 使用`Vue-router`完成组件间路由跳转
- 使用`sessionStorage`完成对首页和列表页面数据的存储，在不结束回话的前提下减少不必要的请求及提高访问速度；
- 项目整体样式及图片通过`frozen UI`移动UI组件完成
- 使用`Jade`编写HTML和`Sass`编写样式
- 项目中使用了`ES6`并通过`babel`完成编译
- 使用`ESlint`对项目代码进行风格统一及校验；
- 通过`Webpack-dev-server`运行，并支持代码`热替换`

效果展示
----
<a href="http://loogeek.github.io/MovieApp-Vue" target="\_blank">Demo</a>

项目整体效果
-------
<div style="margin-bottom: 40px; width: 700px; margin: 0 auto;">
  <img style="width: 45% " src="https://raw.githubusercontent.com/Loogeek/Project_Imgs/master/MovieApp-Vue/1.png" alt="首页"/>
  <img style="width: 45% " src="https://raw.githubusercontent.com/Loogeek/Project_Imgs/master/MovieApp-Vue/2.png" alt="菜单栏"/>
</div>
<div style="margin-bottom: 40px; width: 700px; margin: 0 auto;">
  <img style="width: 45% " src="https://raw.githubusercontent.com/Loogeek/Project_Imgs/master/MovieApp-Vue/3.png" alt="详情页"/>
  <img style="width: 45% " src="https://raw.githubusercontent.com/Loogeek/Project_Imgs/master/MovieApp-Vue/4.png" alt="列表页"/>
</div>

运行
-------
npm install安装包后通过npm run dev命令启动服务器，`0.0.0.0:3000` 端口下查看项目，
若想改成其他启动端口可在package.json文件中修改scripts下的dev--host域名及--port端口

``` bash
npm install    
npm run dev   # run the counter example
```

后期完善
-------
完善代码功能
