import {getLyric} from '@/api/song.js'
import {ERR_OK} from '@/api/config.js'
import { Base64 } from 'js-base64';

export default class Song{
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id=id;
    this.mid=mid;
    this.singer=singer;
    this.name=name;
    this.album=album;
    this.duration=duration;
    this.image=image;
    this.url=url
  }

  getLyric(){
    if(this.lyric){
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve,reject)=>{
      getLyric(this.mid).then((response)=>{    //这里发送的是个异步请求，请求回来后对lyric赋值
        if(response.retcode==ERR_OK){
          this.lyric=Base64.decode(response.lyric);
          //console.log(this.lyric);
          resolve(this.lyric);       //如果ok调用getLyric().then((res)=>{res})  中的res就是this.lyric
        }
        else{
          reject('no lyric');
        }
      })
    })

  }
}

export function createSong(musicData) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=126548448`
  })
}

function filterSinger(singer) {
  let ret=[];
  if(!singer){
    return ''
  }
  singer.forEach((item)=>{
    ret.push(item.name)
  })
  return ret.join('/');
}
