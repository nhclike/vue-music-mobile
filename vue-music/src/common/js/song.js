export default class Song{
  constructor({id,mid,singer,name,albm,duration,image,url}){
    this.id=id;
    this.mid=mid;
    this.singer=singer;
    this.name=name;
    this.albm=albm;
    this.duration=duration;
    this.image=image;
    this.url=url
  }
}

export function createSong(musicData) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid
  })
}
