<template>
	<transition name="silde">
    <music-list :songs="songs" :bgImage="bgImage" :title="title"></music-list>
	</transition>
</template>

<script>
  import MusicList from '@/components/music-list/music-list'
  import {getSongList} from '@/api/recommend.js'
  import {ERR_OK} from  '@/api/config.js'
  import {createSong} from  '@/common/js/song.js'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        songs:[]
      }
    },
    computed:{
      ...mapGetters([
        'disc'
      ]),
      bgImage(){
        return this.disc.imgurl
      },
      title(){
        return this.disc.dissname
      }
    },
    components:{
      MusicList
    },
    created(){
      this._getSongList();
    },

    updated(){

    },
    methods:{
      _getSongList(){
        if(!this.disc.dissid){
          this.$router.push({path:'/recommend'});
          return
        }
        let me=this;
        getSongList(this.disc.dissid).then((res)=>{
          if(res.code==ERR_OK){
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="less">
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0);
  }
</style>
