## 练级之路 

我的demo repo目录搞得太复杂了。  
新建一个repo，此repo存放页面仿制。  
初级版本 仅 gulp + BrowserSync。

#### 使用方法  

##### Gukp Serve （with BrowserSync）

1. 更改gulpfile 变量 workingtarget，为正在制作的项目
2. 执行 `gulp serve`, 启动BrowserSync，使用多屏幕liveReload开发。

##### 新增一个workdir 
```
npm run new {{ workdir name }}
```
例：  
```bash
$ npm run new resume

> learngulp@1.0.0 new F:\myrepo\Combo-the-road
> node tools/new.js "resume"

当前目录 F:\myrepo\Combo-the-road
子进程已关闭，代码：0
```
##### 切换一个workdir 
```
npm run s {{ 文件夹名开头的数字 }}
```
例：
```bash
$ npm run s 13

> learngulp@1.0.0 s F:\myrepo\Combo-the-road
> node tools/switch.js "13"

已切换到: 13_resume
```
#### List

- [1-practise-ui](1_practise_ui/) 粗仿UI套件  
练习了技能 video自定义控件  
初次使用 currentColor
使用flex做layout

- [2_random_layout] 使用flex布局，生成随机的纵横条块布局  
【未完成】  
idea: 抽象音乐画作

- [3_svg_ani](3_svg_ani/) 使用svg滤镜实现粘腻效果  
滚动滚动条，右上角menu按钮被覆盖时，会展示效果。
使用了svg 的filter  


- [4_hammerjs](4_hammerjs) 页面触控事件尝试  
使用封装库完成

- [5_clock_ani](5_clock_ani) CSS 练习，时钟  
模仿自dribbble  
使用animation，效果平滑。  
细节考究，时钟滞后。

- [6_img_placeholder](6_img_placeholder) 图片占位符  
利用浏览器对dom加载的特性，实现图片平滑懒加载。  
添加过度效果  
使用vue完成，使用mvvm设计方法

- [7_scroll2top](7_scroll2top) 滚动到页面顶部  

- [8_custome_select](8_custome_select) 自定义美化表单元素  
rebuilt 同步表单元素状态

- [9_moment]  停下来写文字

- [10_event_delegation](10_event_delegation) 事件委托


- [11_ddwrt](11_ddwrt) ddwrt 上部署仪表盘  
使用vue浏览器方式

- [12_css3d](12_css3d/) trans 3D  
[第22课作业](12_css3d/homework.html)，3D hover，3D眼睛  
[demo](12_css3d/index.html)  
[Nested 3d-transforms](https://davidwalsh.name/3d-transforms)  

- [13_resume](13_resume) 个人简历  

- [14_auth_js](14_auth_js) slimeJs 使用实例
自动点击网页进行网络登陆

- [15_dom_lib](15_dom_lib) DOM 库封装  
了解JQuery怎么做出来的。