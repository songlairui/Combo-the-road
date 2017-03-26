
// video 自定义控件
var btn_act = document.getElementsByClassName('act')[0]
var v = document.getElementsByTagName('video')[0]
var posidot = document.getElementsByClassName('posidot')[0]
var progressbar = document.getElementsByClassName('progress')[0]

var totalTime = 0
v.oncanplay = function(){
  // 当可以播放时，设置视频信息
  console.info('缓存程度-可以播放了')
  totalTime = v.duration
}

v.ontimeupdate = function () {
  console.log('进度条更新')
  console.log(v.currentTime, v.duration)
  var per =Math.floor(v.currentTime / v.duration * 10000)/100
  console.log(per)
  posidot.style.left=per+"%";
  if(per === 100){
    // 播放完成，变成停止状态
    togglePlayPause()
  }
}

function togglePlayPause(){
  console.group('自定义控件 btn act')
  // console.log('◢')
  if('pause' === btn_act.dataset.status){
    console.log('当前为暂停状态，点击之后变为play状态')
    btn_act.dataset.status = 'playing'
    btn_act.innerHTML = '='
    console.log('播放')
    v.play()
  } else {
    console.log('当前为Play状态，点击之后变为pause状态')
    btn_act.dataset.status = 'pause'
    btn_act.innerHTML = '◢'
    console.log('暂停')
    v.pause()
  }
  console.groupEnd()
}

progressbar.onclick = function(e){
    var event = e||window.event;
    // console.log((event.offsetX-4) , (progressbar.offsetWidth))
    var per = (event.offsetX - 4) / this.offsetWidth
    if(per < 0) per = 0
    if(per >= 1) per = 0.999

    v.currentTime = per * v.duration;
};


btn_act.addEventListener('click', togglePlayPause, false)