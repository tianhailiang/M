# dxz-node-php

该项目是基于express + nunjucks + gulp + sui + bootstrap 的web 站开发环境;

##### 环境

 1. node v6.10.3
 2. npm v3.10.10

##### 技术栈

> [nunjucks](https://mozilla.github.io/nunjucks/cn/getting-started.html)

> [express](http://www.expressjs.com.cn/4x/api.html)

> [gulp](http://www.gulpjs.com.cn/docs/api)

> [bootstrap](http://www.runoob.com/bootstrap)

> [sui](http://sui.taobao.org/)

---

### 安装
项目地址：（使用`git clone`）

```shell
http://123.206.65.202:10080/dxz_php/php_node_js.git
```

通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))，使用npm安装依赖模块可能会很慢,node_modules 可通过copy方式到本地环境;

```shell
npm install -g gulp

npm install
```
注释:
cnpm 会导致在windows下的webstorm 重复建立索引,暂停使用

```bash
# 启动服务
gulp server
# 打包发布css\js\image代码
gulp default

```

### 开发

### 目录结构
<pre>
.
├── README.md           
├── app.js                     // 项目设置文件
├── routes                   // 项目的路由文件目录
│   ├── router.js        // 路由设置
│   ├── controller.js  // 路由页面
├── views                      // 页面html
├── public                     // 页面文件资源存放位置
│   ├── static               // css 和 js 资源
│   ├── stylesheets           // 资源依赖
├── bin             // 项目启动目录
│   ├── www.js                 // 启动文件
├── package.json             // 项目配置文件
├── gulpfile.js             // gulp配置文件

.
</pre>

###  切换不同环境

#####  环境配置在package.json 中scripts标签中

```
npm run test    //测试
npm run dev     //开发development
npm run mock    //mock环境
npm run start   //正式环境 production

```
