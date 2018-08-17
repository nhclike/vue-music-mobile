<template>
	<div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="scroll">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div  class="icon">
            <img v-lazy="item.picUrl" width="100" height="100" alt="">
          </div>
          <ul class="songlist" >
            <li class="song" v-for="(song,index) in item.songList">
               <span >{{index+1}}</span>
                <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="load-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import {getTopList} from '@/api/rank.js'
  import {ERR_OK} from '@/api/config.js'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import {playlistMixin} from '@/common/js/mixin.js'
  import {mapMutations} from 'vuex'
  export default {
    mixins:[playlistMixin],
    data(){
      return {
        topList:[]
      }
    },
    created(){
     /* setTimeout(()=>{
        this._getTopList();

      },1000)*/
     this._getTopList();
    },
    components:{
      Scroll,
      Loading
    },
    methods:{
      handlePlaylist(playList){
        const bottom=playList.length>0?'60px':'';
        this.$refs.rank.style.bottom=bottom;
        this.$refs.scroll.refresh();
      },
      _getTopList(){
        getTopList().then((res)=>{
          if(res.code==ERR_OK){
            this.topList=res.data.topList;
              //console.log(res.data.topList)
          }
        })
      },
      selectItem(item){
        //console.log(item);
        this.$router.push({
          path:'/rank/toplist'
        });
        this.setTopList(item);
      },
      ...mapMutations({
        setTopList:'SET_TOP_LIST'
      })
    },
    watch: {
      topList() {
        setTimeout(() => {
          this.$Lazyload.lazyLoadHandler()
        }, 20)
      }
    },
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
  @import "./../../common/css/mixin.less";
  .rank{
    position: fixed;
    width: 100%;
    top:88px;
    bottom:0;
    .toplist{
      height: 100%;
      overflow: hidden;
      .item{
        display: flex;
        height:100px;
/*
        border: 1px solid #ddd;
*/
        margin: 0 20px;
        padding-top:20px;
        &:last-child{
          padding-bottom: 20px;
         }
        .icon{
          flex: 0 0 100px;
          height: 100px;
          width: 100px;
/*
          border: 1px solid #ddd;
*/
        }
        .songlist{
           display:flex;
           flex-direction:column;
           justify-content:center;
           padding:0 20px;
           height:100px;
           width: 100%;
           overflow:hidden;
           background-color:@color-highlight-background;
           color:@color-text-d;
           font-size:@font-size-small;
          .song{
           line-height: 26px;
          }
        }
      }
    }
  }
</style>
