/**
 * Created by lij on 2018/8/14.
 */
import {commonParams} from './config'

import axios from 'axios'
//拿到歌词数据
export  function getLyric(mid) {
  //const url='https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const url='/api/lyric';
  const data=Object.assign({}, commonParams,{
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'

  });
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

