<template>
  <transition name="singer">
    <music-list :songs="songs" :bgImage="bgImage" :title="title"></music-list>
  </transition>

</template>

<script>
  import {getSingerDetail} from '@/api/singer'
  import {ERR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  import { mapGetters } from 'vuex'
  import MusicList from '@/components/music-list/music-list'
  export default {
    data(){
      return {
        songs:[]
      }
    },
    computed:{
      title(){
        return this.singer.name;
      },
      bgImage(){
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._getSingerData();
      //console.log(this.singer);
    },
    components:{
      MusicList,
    },
    methods:{
      /*_getSingerId(){ //解析歌手列表页面传过来的参数
        let singerInfo= this.$route.query;
        //console.log(singerInfo);
        return singerInfo.sid;
      },*/
      _getSingerData(){ //通过传过来的id拿到歌手详细数据
        /*this.singerId=this._getSingerId();*/
        //console.log(this.singerId);
        //console.log(this.singer.id);
        let me=this;
        if(this.singer.id){
          getSingerDetail(this.singer.id).then((res)=>{
            if(res.code==ERR_OK){
              let singerData=res.data;
              let songList=singerData.list;
              this.songs=me._normalizeSongs(songList);
              console.log(songList);

            }
          })
        }else{
          this.$router.push({
            path:'/singer'
          })
        }

      },
      _normalizeSongs(list){ //格式化歌曲数据
        let ret=[];
        for(var i=0;i<list.length;i++){
          var musicData=list[i].musicData;
          //console.log(musicData);
          let mdata=createSong(musicData);
          ret.push(mdata);
        }
        return ret
      }
    }
  }
</script>

<style scoped lang="less">
.singer-detail{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: red;
  color: #fff;
  text-align: center;
  line-height: 100%;
}
  .singer-enter-active{
    animation: fold-in .2s;
  }
  .singer-leave-active{
    animation: fold-out .2s;
  }
@keyframes fold-in {
  0% {
    transform: translate3d(100%,0 , 0);
  }
  50% {
    transform: translate3d(50%,0,  0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-50%,0,  0);
  }
  100% {
    transform: translate3d(-100%,0,  0);
  }
}
</style>
