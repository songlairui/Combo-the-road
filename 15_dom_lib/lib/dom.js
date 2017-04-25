// 照抄了一遍。添加了一些注释。还有一些不成功的尝试。
window.$ = function (selectorOrNode) {
    let array = []
    if (typeof selectorOrNode === 'string') {
        let items = document.querySelectorAll(selectorOrNode)
        // 试一下是否可以
        // array.push(...Array.from(items))
        for (var i = 0; i < items.length; i++) {
            array.push(items[i])
        }
    } else if (selectorOrNode instanceof Element) {
        array.push(selectorOrNode)
    } else if (selectorOrNode instanceof Array) {
        for (var i = 0; i < selectorOrNode.length; i++) {
            if (!selectorOrNode[i] instanceof Element) {
                continue
            }
            array.push(selectorOrNode[i])
        }
    }

    // 对象属性、方法
    // 监听器
    array.on = function(eventType, fn){
        for(var i = 0;i<array.length;i++){
            array[i].addEventListener(eventType, fn)
        }
    }
    // Class的添加，Element.classList 
    array.addClass = function (className){
        for(var i = 0 ; i< array.length;i++){
            array[i].classList.add(className)
        }
        // 链式调用
        // return this
        return array
    }
    array.removeClass = function (className){
        for(var i = 0 ; i< array.length;i++){
            array[i].classList.remove(className)
        }
        return array
    }
    // 节点内容
    array.text = function(value){
        if(value === undefined){
            // 如果空参数，则返回已有的值
            let result = []
            for(var i = 0;i<array.length;i++){
                result.push(array[i].textContent)
            }
            return result
        } else {
            for(var i = 0;i<array.length;i++){
                array[i].textContent = value
            }
            return array
        }
    }
    // 获取子内容
    array.get = function ( index ) {
        return array[index]
    }
    array.end = function(){
        return array.previousSelection
        // return array[array.length - 1]
    }
    array.siblings = function () {
        let children = array[0].parentNode.children
        let resultArray = []
        // [].splice.apply(a,idx,1)
        for ( var i = 0 ; i< children.length;i++){
            if(array[0] !== children[i]){
                resultArray.push(children[i])
            }
        }
        let items = $(resultArray)
        items.previousSelection = array
        return items
    }

    return array
}