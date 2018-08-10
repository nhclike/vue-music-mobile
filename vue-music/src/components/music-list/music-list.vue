<template>
	<div class="music-list">
    <div class="back" @click="back">
        <i class="icon-back" ></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image"  :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer">

    </div>
    <scroll :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @selectItem="selectItem"></song-list>

      </div>
    </scroll>
	</div>
</template>

<script>
  import SongList from '@/base/song-list/song-list'
  import Scroll from '@/base/scroll/scroll'
  import {prefixStyle} from '@/common/js/dom.js'
  import {mapActions} from 'vuex'  //action中定义一次改变vuex中多个变量的方法
  const RESERVED_HEIGHT=40;
  //根据浏览器自动加前缀
  const transform=prefixStyle('transform');
  const backdrop=prefixStyle('backdrop-filter');
  export default {
    props:{
      songs:{
        type:Array,
        default:[]
      },
      title:{
        type:String,
        default:''
      },
      bgImage:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        scrollY:-1
      }
    },
    components:{
      SongList,
      Scroll
    },
    created(){
      this.probeType=3;
      this.listenScroll=true;

      //console.log('music-list created');
      //console.log(this.songs);
    },
    mounted(){
      this.imageHeight=this.$refs.bgImage.clientHeight;
      this.minTranslateY=-this.imageHeight+RESERVED_HEIGHT;
      this.$refs.list.$el.style.top=this.imageHeight+'px';
      if(this.songs.length>0){
        //console.log('music-list mounted');
        //console.log(this.songs);
      }

    },
    computed:{
      bgStyle(){
        return `background-image:url(${this.bgImage})`
      }
    },
    methods:{
      scroll(pos){
        this.scrollY=pos.y;
      },
      back(){
        //console.log(this.$router);
        this.$router.back()
      },
      random(){

      },
      selectItem(song,index){
        //console.log(song);
        //console.log(index);
        this.selectPlay({
          list:this.songs,
          index:index
        })
      },
      ...mapActions([  //暴露出actions中的方法，作为方法直接调用
        'selectPlay'
      ])
    },
    watch:{
      songs(old){
       // console.log(old);
      },
      scrollY(newY){
        let translateY=Math.max(this.minTranslateY,newY);
        let zIndex=0;
        let scale = 1;
        let blur = 0

        const percent = Math.abs(newY / this.imageHeight);
        console.log(this.minTranslateY);
        console.log(newY);
        if(newY>0){  //滚动上限
          zIndex=10;
          scale = 1 + percent

        }else{
          blur = Math.min(20, percent * 20)

        }
        this.$refs.layer.style[transform]=`translateY(${translateY}px)`;
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`;


        if(newY<this.minTranslateY){
          zIndex=10;
          this.$refs.bgImage.style['padding-top']='0';
          this.$refs.bgImage.style['height']=RESERVED_HEIGHT+'px';
          this.$refs.playBtn.style['display']='none';
        }
        else {
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.height = 0;
          this.$refs.playBtn.style['display']='block';

        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`;

        this.$refs.bgImage.style.zIndex = zIndex
      }
    }
  }
</script>

<style scoped lang="less">
 @import "./../../common/css/variable.less";
 @import "./../../common/css/mixin.less";
  .music-list{
    position: fixed;
    top: 0;
    left:0 ;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: @color-background;
    .back{
      position: absolute;
      top:0;
      left: 6px;
      z-index: 40;
      .icon-back{
        display: block;
        padding: 10px;
        font-size: @font-size-large-x;
        color: @color-theme;
      }
    }
    .title{
      position: absolute;
      top:0;
      left: 10%;
      width: 80%;
      text-align: center;
      line-height: 40px;
      color: @color-text;
      font-size: @font-size-large;
      z-index: 50;
    }
    .bg-image{
      position: relative;
      width: 100%;

      height:0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      .play-wrapper{
        position: absolute;
        bottom:20px;
        width: 100%;
        .play{

          text-align: center;
          border: 1px solid @color-theme;
          color:@color-theme;
          border-radius: 100px; box-sizing: border-box;
          width:135px;
          padding: 7px 0;
          margin: 0 auto;
          .icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size:@font-size-medium-x;
          }
          .text{
            display: inline-block;
            vertical-align: middle;
            font-size: @font-size-small;
          }
        }
      }
      .filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list{
      position:fixed;
      top:0;
      bottom:0;
      width:100%;
      background:@color-background;
     .song-list-wrapper{
       padding: 20px 30px;
     }
    }
    .bg-layer{
      height: 100%;
      background:@color-background;
    }
  }
</style>
