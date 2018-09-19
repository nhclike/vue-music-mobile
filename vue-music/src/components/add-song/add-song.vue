<template>
	<div>
    <div class="add-song" @click.stop v-show="showFlag">
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange"  placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!queryStr">
        <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll ref="songList" class="list-scroll" v-if="currentIndex===0" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @selectItem="selectSong">

              </song-list>
            </div>
          </scroll>
          <scroll ref="searchList" :refreshDelay="refreshDelay" class="list-scroll" v-if="currentIndex===1" :data="searchHistory">
            <div class="list-inner">
              <search-list :list="searchHistory" @delete="deleteSearchHistory" @select="addQuery">

              </search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="queryStr" ref="searchResult">
        <suggest :query="queryStr" :showSinger="showSinger" @listScroll="blurInput" @select="selectSuggest"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </div>
</template>

<script>
  import SearchBox from '@/base/search-box/search-box'
  import {searchMixin} from '@/common/js/mixin.js'
  import Suggest from '@/components/suggest/suggest'
  import Switches from '@/base/switches/switches'
  import SongList from '@/base/song-list/song-list'
  import SearchList from '@/base/search-list/search-list'
  import Scroll from '@/base/scroll/scroll'
  import Song from '@/common/js/song.js'
  import TopTip from '@/base/top-tip/top-tip'
  import {mapGetters,mapActions} from 'vuex'
  export default {
    mixins:[searchMixin],
    data(){
      return {
        showFlag:false,
        showSinger:false,
        currentIndex:0,
        switches:[
          {name:'最近播放',title:'最近播放'},
          {name:'搜索历史',title:'搜索历史'}
          ]
      }
    },
    computed:{
      ...mapGetters([
        'playHistory',
        'searchHistory'
      ])
    },
    methods:{
      show(){
        this.showFlag=true;
        if(this.currentIndex==0){
          this.$refs.songList.refresh()
        }
        else{
          this.$refs.searchList.refresh();
        }

      },
      hide(){
        this.showFlag=false;
      },
      switchItem(index){
        this.currentIndex=index;
      },
      selectSong(item,index){
        if(index!=0){
          //console.log(new Song(item));
          this.insertSong(new Song(item));
          this.showTip();
        }

      },
      selectSuggest(item){
        this.saveSearch(item);
        this.showTip();
      },
      showTip(){
        this.$refs.topTip.show()

      },
      ...mapActions([
        'insertSong'
      ])
    },
    components:{
      SearchBox,
      Suggest,
      Switches,
      SongList,
      SearchList,
      Scroll,
      TopTip
    }
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
.add-song{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  background:@color-background;
  z-index: 200;
  .header{
    position: relative;
    height: 44px;
    text-align: center;
    .title{
      line-height: 44px;
      font-size: @font-size-large;
      color:@color-text;
    }
    .close{
      position: absolute;
      top:0;
      right: 8px;
      .icon-close{
        display: block;
        padding: 12px;
        font-size: 20px;
        color:@color-theme;
      }
    }
  }
  .search-box-wrapper{
    margin: 20px;

  }
  .shortcut{
    .list-wrapper{
      position: absolute;
      top:165px;
      bottom:0;
      width:100%;
      .list-scroll{
        height: 100%;
        overflow: hidden;
        .list-inner{
          padding: 20px 30px;
        }
      }
    }
  }
  .search-result{
    position: fixed;
    top:124px;
    bottom: 0;
    width: 100%;

  }
  .tip-title{
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok{
      font-size: @font-size-medium;
      color:@color-text;
      margin-right: 4px;
    }
    .text{
      font-size: @font-size-medium;
      color:@color-text;
    }
  }
}
</style>
