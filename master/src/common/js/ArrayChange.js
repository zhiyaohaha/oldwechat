//查找数组的对象
export const findModel = function (Arr, name, val) {
  return Arr.find(val => val[name] == val)
}
export const toPercent = function (num) {
  let str
  str = Number(num*100).toFixed(2)
  str = str + "%"
  return str
}
