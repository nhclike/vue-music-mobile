/**
 * Created by lij on 2018/8/13.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice();   //不改变原来的数组arr,  return出去的新数组和原来的数组无关
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t
  }
  return _arr
}
