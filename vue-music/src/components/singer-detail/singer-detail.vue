<template>
  <transition name="singer">
    <div class="singer-detail">
      this  is a singer detail test
    </div>
  </transition>

</template>

<script>
  import {getSingerDetail} from '@/api/singer'
  import {ERR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        song:[]
      }
    },
    computed:{
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._getSingerData();
      //console.log(this.singer);
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
              me._normalizeSongs(songList);
              //console.log(singerData);

            }
          })
        }else{
          this.$router.push({
            path:'/singer'
          })
        }

      },
      _normalizeSongs(list){
        let ret=[];
        for(var i=0;i<list.length;i++){
          var musicData=list[i].musicData;
          let mdata=createSong(musicData);
          this.song.push(mdata);
        }
        console.log(this.song)
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
    animation: fold-in .1s;
  }
  .singer-leave-active{
    animation: fold-out .1s;
  }
@keyframes fold-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
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
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
