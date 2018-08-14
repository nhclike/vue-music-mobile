import originJsonp from 'jsonp'
export default function jsonp(url,data,option) {         //原始的jsonp中需要把url封装好，我们的二次封装主要做的事情就是封装url
                                                         //其中option是指的param也就是callback的名称
  url +=(url.indexOf('?')<0?'?':'&')+param(data);
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param (data) {
  let url='';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
