<template>
	<div>
    <music-list :songs="songs" :bgImage="bgImage" :title="title"></music-list>
	</div>
</template>

<script>
  import MusicList from '@/components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from '@/api/rank.js'
  import {ERR_OK} from '@/api/config.js'
  import {createSong} from '@/common/js/song.js'
  export default {
    data(){
      return {
        songs:[]
      }
    },
    computed:{
      ...mapGetters([
        'topList'
      ]),
      bgImage(){
        return this.topList.picUrl
      },
      title(){
        return this.topList.topTitle
      }
    },
    components:{
      MusicList
    },
    created(){
      this._getSongList();
    },
    methods:{
      _getSongList(){
        //console.log(this.topList)
        getMusicList().then((res)=>{
          if(res.code==ERR_OK){
            let songlist=res.songlist;
            this.songs=this._normalSongList(songlist);
            console.log(this.songs);
          }
        })
      },
      _normalSongList(list){
        let ret=[];
        list.forEach((item,index)=>{
          let musicData=item.data;
          //console.log(musicData.songid);
          if(musicData.songid){
            let mdata= createSong(musicData)
            ret.push(mdata);
          }
        })
        return ret;
      }
    }
  }
</script>

<style>

</style>
