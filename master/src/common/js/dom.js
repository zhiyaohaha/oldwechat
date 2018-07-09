//这是一套操作dom类名的工具
//检查是否有类名
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')//含有className 首尾有空白符或者什么都没有的的字符串
  return reg.test(el.className)//判断这个类名有没有
}
//添加类名
export function addClass(el, className) {
  if (hasClass(el, className)) {
    //如果有这个类名有就不添加
    return
  }
  let newClass
  if(el.className) {
    newClass= el.className.split(' ')    //把类名读取并用空格分成数组
  }else{
    newClass = []
  }
  newClass.push(className)//把新的类名添加到数组里
  el.className = newClass.join(' ')//数组转字符串
}
//删除类名
export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    //判断如果没有 这个类名就不执行
    return
  }
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')//g 全局匹配;找到所有匹配，而不是在第一个匹配后停止
  el.className = el.className.replace(reg, ' ') //把类名替换成空格
}
//读写合一 元素的属性值
export function getData(el, name, val) {
  //el.getAttributeNode()返回指定元素的指定属性， 返回值是 Attr 节点类型
  // let prefix = 'data-'
  if (val) {
    return el.setAttribute(name, val)//如果有val则 修改值
  }
  return el.getAttribute(name)//没有 则返回值
}
//返回元素的上下左右
export function getRect(el) {
  if (el instanceof window.SVGElement) {//判断是否是SVG元素
    //svg 元素可以用于在当前文档（比如说，一个HTML文档）内嵌套一个独立的svg片段 。 这个独立片段拥有独立的视口和坐标系统。
    let rect = el.getBoundingClientRect() //Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    //返回上左 高低
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
