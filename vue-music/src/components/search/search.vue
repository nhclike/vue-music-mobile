<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div>

    <div class="shortcut-wrapper"  ref="shortcutWrapper">
      <scroll class="shortCut" :refreshDelay="refreshDelay" :data="shortCut" ref="scroll">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li v-for="item in hotKey" class="item" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="clearHistory">
              <i class="icon-clear">
              </i>
            </span>
            </h1>
            <search-list :list="searchHistory" @delete="delSearch" @select="addQuery"></search-list>
          </div>
        </div>
      </scroll>

    </div>
    <div class="search-result" v-show="queryStr" ref="searchResult">
      <suggest :query="queryStr" :showSinger="showSinger" @listScroll="blurInput" @select="saveSearch" ref="suggest"></suggest>
    </div>
    <Confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="confirmDel" @cancel="cancelDel"></Confirm>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import SearchBox from '@/base/search-box/search-box'
  import Confirm from '@/base/confirm/confirm'
  import SearchList from '@/base/search-list/search-list'
  import Suggest from '@/components/suggest/suggest'
  import {getHotKey} from '@/api/search'
  import Scroll from '@/base/scroll/scroll'
  import {ERR_OK} from '@/api/config'
  import {playlistMixin,searchMixin} from '@/common/js/mixin.js'
  import {mapActions} from 'vuex'
  export default {
    mixins:[playlistMixin,searchMixin],
    data(){
      return {
        hotKey:[],
        showSinger:true
      }
    },
    components:{
      SearchBox,
      SearchList,
      Suggest,
      Confirm,
      Scroll
    },
    created(){
      this._getHotKey();
    },
    computed:{
      shortCut(){
        return this.hotKey.concat(this.SearchList)
      }
    },
    methods:{
      handlePlaylist(playList){
        const bottom= playList.length>0?'60px':'';
        this.$refs.shortcutWrapper.style.bottom=bottom;
        this.$refs.scroll.refresh();
        this.$refs.searchResult.style.bottom=bottom;
        this.$refs.suggest.scrollRefresh();

      },
      _getHotKey(){
        getHotKey().then((res)=>{
          if(res.code===ERR_OK){
             //console.log(res);
             this.hotKey=res.data.hotkey.slice(0,10)
          }
        })
      },
      delSearch(item){
        console.log(item);
        this.deleteSearchHistory(item)
      },
      clearHistory(){
        this.$refs.confirm.show();
      },
      confirmDel(){
        this.clearSearchHistory();
      },
      cancelDel(){
        this.$refs.confirm.hide();
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      }
    },
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
  h1{
    color:#fff
  }
  .search{
    position: fixed;
    top:80px;
    bottom: 0;
    width: 100%;
    .search-box-wrapper{
      margin: 20px;
    }
    .search-result{
      position: fixed;
      top:158px;
      bottom: 0;
      width: 100%;
    }
    .shortcut-wrapper{
      position: fixed;
      top:178px;
      bottom: 0;
      width: 100%;
      .shortCut{
        height: 100%;
        overflow: hidden;
      }
      .hot-key{
        margin:0 20px 20px 20px;
        .title{
          font-size: @font-size-medium;
          color:@color-text-l;
          margin-bottom: 20px;
          line-height: @font-size-medium;
        }
        .item{
          display: inline-block;
          margin: 0 20px 10px 0;
          padding:12px 8px;
          border-radius: 6px;
          font-size:@font-size-medium ;
          color:@color-text-d;
          background: @color-highlight-background;
        }
      }
      .search-history{
        position: relative;
        margin: 0 20px;
        .title{
          display: flex;
          align-items:center;
          height:40px;
          font-size:@font-size-medium;
          color:@color-text-l;

          .text{
            flex: 1;
            height: 20px;
            line-height: 20px;

          }
          .clear{
            .icon-clear{
              font-size: @font-size-medium;
              color:@color-text-d;
            }
          }
        }
      }
    }
  }
</style>
