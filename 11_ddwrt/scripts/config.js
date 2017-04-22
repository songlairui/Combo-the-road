const 示例 = {
  template: `<div>
  foo
</div>`
}

const routes = [{
  path: '/1',
  component: 示例
}, {
  path: '/delivery',
  name: 'delivery',
  component: 发货
}]

const router = new VueRouter({
  routes
})