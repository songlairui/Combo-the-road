var myapp = new Vue({
  el: '#app',
  router,
  data() {
    return {
      title: '仪表盘',
      testArr: new Array(3).fill(0).map((v, i) => i + 1),
      toast:'',
      editable:false
    }
  },
  created () {

  },
  computed: {
    allProduct() {
      var src = product_attr
      return src.grain.map(grain => src.shape.map(shape => src.color.map(color => `${grain} - ${color} - ${shape}`)))
    }
  },
  methods: {
    handleme(state){
      this.toast = this.editable ? '编辑状态':''
    },
    toggleEdit(){
      this.editable = !this.editable
      this.toast = this.editable ? '编辑状态':''
    },
    test(){
      console.info('toast')
    }
  },
  components: {
    extraItem
  }
})