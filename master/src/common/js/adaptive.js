(function () {
  //求元素像素比
  let dpr = window.devicePixelRatio || 1;
//求比值    0.5
  let scale = 1/dpr;
//375px
//获取meta标签
  let metaNode = document.querySelector('meta[name="viewport"]');
  metaNode.setAttribute('content',`width=device-width,initial-scale=${scale},user-scalable=0,maximum-scale=1.0,user-scalable=no`)
//以rem单位为元素，需要把缩小的比例乘回来 （2）
  let width = document.documentElement.clientWidth/16;

  let styleNode = document.createElement('style');
  styleNode.innerHTML = 'html{font-size: '+ (width) +'px !important;}'
  document.head.appendChild(styleNode)
  let clientHeight = document.body.clientHeight;
  let _focusElem = null; //输入框焦点
  //利用捕获事件监听输入框等focus动作
  document.body.addEventListener("focus", function(e) {
    _focusElem = e.target || e.srcElement
  }, true);
  //因为存在软键盘显示而屏幕大小还没被改变，所以以窗体（屏幕显示）大小改变为准
  window.addEventListener("resize", function() {
    if (_focusElem && document.body.clientHeight < clientHeight) {
      //焦点元素滚动到可视范围的底部(false为底部)
      _focusElem.scrollIntoView(false)
    }
  })
})()
