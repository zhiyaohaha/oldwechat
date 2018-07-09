# y

> y

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
//vue 脚手架的服务器
npm run dev

# build for production with minification
//打包
npm run build

# build for production and view the bundle analyzer report
//打包检查
npm run build --report

# run unit tests
//单元测试
npm run unit

# run all tests
//所有测试
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# 关于项目的文件夹

build -- webpack的配置文件
config -- 命令的配置文件
dist -- 打包后的文件

-  static -- 打包后资源文件夹  (js,css,img)
-   index.html -- 打包后的主页面

node_modules -- npm下载的库

- src -- 主要的开发文件
- api -- 接口文件（放置的ajax发送请求）
- common -- 共用文件夹

	- js -- 放置了一些静态js

		-      adaptive.js -- 移动端1px适配
		-      ArrayChange.js -- 放了一点不常用到的函数
		-      city.js -- 城市的数据
		-      dom.js -- 操作dom类的工具函数

	- variables.styl -- stylus的全局变量（目前只有一个基准值，如果以后公司有需要统一颜色，字体大小的变量可以放在这里）

- components -- 放置组件

	-  agreementMod -- 掌金超协议
	-  allBankList -- 信用卡银行组件
	-  attentionMod -- 关注公众号二维码弹窗
	-  authenticationList -- 详情页认证材料组件
	-  awaitMod -- 等待弹窗
	-  bankInquireMod -- 没有用这应该是以前需求所用到的
	-  cardHeadLine -- 这个也没有用应该是以前需求所用到的
	-  orderFormPage -- 这个是筛选框用到的标题
	-  checkboxList -- 多选框组件
	-  creditCardMod -- 这个也没有用应该是以前需求所用到的
	-  detailsMessageMod -- 信用卡详情页的基本信息的组件
	-  drawMoney -- 提现明细列表
	-  footline -- 底部文字 通常用于上拉加载的底部
	-  forms -- 这是计划做一个表单的模版 但由于需求的改变 不需要开发下去拉 不用
	-  generalizeMod -- 首页的信用卡用和推广返佣的模版组件
	-  generalizeSanMod -- 这个是三级代理明细
