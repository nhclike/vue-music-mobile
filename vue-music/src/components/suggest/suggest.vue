<template>
	<scroll class="suggest" :data="result">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
	</scroll>
</template>

<script>
  import {search} from '@/api/search.js'
  import {ERR_OK} from '@/api/config.js'
  import {createSong} from '@/common/js/song.js'
  import Scroll from '@/base/scroll/scroll'
  const TYPE_SINGER = 'singer';
  const perpage = 20;
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
      Scroll
    },
    data(){
      return {
        page:1,
        result:{}
      }
    },
    methods:{
      search(){
        //抓取检索数据
        search(this.query,this.page,this.showSinger,perpage).then((res)=>{
            //console.log(res)
            if(res.code==ERR_OK){
              this.result=this._genResult(res.data);
              console.log(this.result);
              /*var data=res.data;
              console.log(data);
              var t={...data.zhida, ...{type: 2}}
              console.log(t)*/
            }
        })
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
      }
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
}
</style>
