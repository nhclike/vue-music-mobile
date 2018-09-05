<template>
	<scroll class="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="serachMore" @beforeScroll="listScroll" ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result :title="noResultMsg"></no-result>
    </div>
	</scroll>
</template>

<script>
  import {search} from '@/api/search.js'
  import Loading from '@/base/loading/loading'
  import {ERR_OK} from '@/api/config.js'
  import {createSong} from '@/common/js/song.js'
  import Scroll from '@/base/scroll/scroll'
  import Singer from '@/common/js/singer.js'
  import NoResult from '@/base/no-result/no-result'
  import { mapMutations ,mapActions} from 'vuex'
  const TYPE_SINGER = 'singer';
  const perpage = 40;
  export default {
    props:{
      query:{
        type:String,
        default:''
      },
      showSinger:{
        type:Boolean,
        default:true
      }
    },
    components:{
      Scroll,
      Loading,
      NoResult
    },
    data(){
      return {
        page:1,
        result:[],
        pullup:true,
        hasMore:true,
        noResultMsg:'没有搜索到结果',
        beforeScroll:true
      }
    },
    methods:{
      search(){
        this.page=1;
        this.hasMore=true;
        //抓取检索数据
        search(this.query,this.page,this.showSinger,perpage).then((res)=>{
            //console.log(res)
            if(res.code==ERR_OK){
              this.result=this._genResult(res.data);
              this._checkMore(res.data);
              //console.log(this.result);
              /*var data=res.data;
              console.log(data);
              var t={...data.zhida, ...{type: 2}}
              console.log(t)*/
            }
        })
      },
      scrollRefresh(){
        this.$refs.suggest.refresh();
      },
      listScroll(){
        this.$emit('listScroll')
      },
      selectItem(item){
        //console.log(item);

        if(item.type===TYPE_SINGER){
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          });
          //console.log(singer);
          this.$router.push({
            path:'/search/detail',
            query:item
          });
          this.setSinger(singer);
        }
        else{
          this.insertSong(item);
        }
        this.$emit('select',item);
      },
      serachMore(){
        if(!this.hasMore){
          return ;
        }
        this.page++;
        search(this.query,this.page,this.showSinger,perpage).then((res)=>{
          if(res.code==ERR_OK){
            this.result=this.result.concat(this._genResult(res.data));
            this._checkMore(res.data);
          }
        })
      },
      _checkMore(data){
        const song=data.song;
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data){
        let ret=[];
        if(data.zhida&&data.zhida.singerid){
          ret.push({...data.zhida,...{type:TYPE_SINGER}})
        }
        if(data.song.list){
          ret=ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret;
      },
      _normalizeSongs(list){
        let ret=[];
        list.forEach((item)=>{
          if(item.songid && item.albummid){
            ret.push(createSong(item))
          }
        });
        return ret;
      },
      getDisplayName(item){
        //console.log(item);
        if(item.type===TYPE_SINGER){
          return item.singername
        }
        else{
          return `${item.name}-${item.singer}`
        }
      },
      getIconCls(item){
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch:{
      query(val){
        //console.log(val);
        this.search();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
.suggest{
  height:100%;
  background:@color-background;
  overflow:hidden;
  .suggest-list{
    padding:0 30px;
    .suggest-item{

      padding-bottom: 20px;
       display: flex;
       align-items: center;
      .icon{
        flex: 0 0 30px;
        width: 30px;
        [class^="icon-"]{
          font-size: 14px;
          color:@color-text-d;
        }
      }
      .name{
        flex: 1;
        font-size: @font-size-medium;
        color: @color-text-d;
        overflow: hidden;

        .text{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          height: 20px;
          line-height: 20px;
        }

      }
    }
  }
  .no-result-wrapper{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate3D(-50%,-50%,0);
  }
}
</style>
