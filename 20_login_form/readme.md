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

# 表单校验细节
 - [x] 表单输入时候，显示校验信息
 - [x] 表单未输入状态，不显示校验信息
 - [x] 表单提交时，校验未输入表单
 - [x] 切换焦点表单时，清除隐藏表单的校验，校验要显示的表单，且不校验空值
 - [x] 登录成功之后，清除登录表单的提示信息，并清空表单
 - [x] 登出成功后，重新校验登录表单。


 设计来自 [Gal Shir @ Dribbble](https://dribbble.com/shots/2287561-Login-Sign-Up-Interface)
 GitHub Repo：[songlairui/Combo-the-road](https://github.com/songlairui/Combo-the-road/tree/master/20_login_form)

 TODO:

