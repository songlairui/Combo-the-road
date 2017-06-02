# 登录与注册页面

 > 使用了CSS translate3d, 为页面元素设计了空间变化。

 - [x] tab 标签
  - [x] tab 标签指示下划线，创意的使用双线条叠加实现类似原稿的动效
 - [x] 表单的空间移动
  - [x] 表单内容的隐藏拆分成：
  	1. 子元素 opacity->0,
  	2. 增加透明遮罩，
  	3. 和显示区域底色的出现
 - [x] 底部meta信息
 - [x] 手机端简单优化，保持在可见区域
 - [x] 表单校验
  - [x] 使用了Class语法糖，允许直接调用
  - [x] 伪策略模式，组合进行验证

 设计来自 [Gal Shir @ Dribbble](https://dribbble.com/shots/2287561-Login-Sign-Up-Interface)
 GitHub Repo：[songlairui/Combo-the-road](https://github.com/songlairui/Combo-the-road/tree/master/20_login_form)

 TODO:

 [ ] 原型链的使用？
 [ ] validDict 方法对优化， 每个方法对结构类似，看起来能通过高阶函数直接返回出来
