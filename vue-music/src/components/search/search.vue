<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div>

    <div class="shortcut-wrapper">
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
            <span>
              <i class="icon-clear">
              </i>
            </span>
          </h1>
          <search-list :list="searchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="queryStr">
      <suggest :query="queryStr" :showSinger="showSinger" @listScroll="blurInput" @select="saveSearch"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import SearchBox from '@/base/search-box/search-box'

  import SearchList from '@/base/search-list/search-list'
  import Suggest from '@/components/suggest/suggest'
  import {getHotKey} from '@/api/search'
  import {ERR_OK} from '@/api/config'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        hotKey:[],
        queryStr:'',
        showSinger:true
      }
    },
    components:{
      SearchBox,
      SearchList,
      Suggest
    },
    created(){
      this._getHotKey();
    },
    computed:{
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods:{
      addQuery(k){
        this.$refs.searchBox.setQuery(k);
      },
      onQueryChange(query){
        this.queryStr=query
        //console.log(query)
      },
      blurInput(){
        this.$refs.searchBox.blur()
      },
      _getHotKey(){
        getHotKey().then((res)=>{
          if(res.code===ERR_OK){
             //console.log(res);
             this.hotKey=res.data.hotkey.slice(0,10)
          }
        })
      },
      saveSearch(item){
        //console.log(item);
        this.saveSearchHistory(item)
      },
      ...mapActions([
        'saveSearchHistory'
      ])
    }
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
      .hot-key{
        margin:0 20px 20px 20px;
        .title{
          font-size: @font-size-medium;
          color:@color-text-l;
          margin-bottom: 20px;
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
