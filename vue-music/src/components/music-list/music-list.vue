<template>
	<div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image"  :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer">

    </div>
    <scroll :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" ></song-list>

      </div>
    </scroll>
	</div>
</template>

<script>
  import SongList from '@/base/song-list/song-list'
  import Scroll from '@/base/scroll/scroll'
  const RESERVED_HEIGHT=40;
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
      }
    },
    watch:{
      songs(old){
       // console.log(old);
      },
      scrollY(newY){
        let translateY=Math.max(this.minTranslateY,newY);
        let zindex=0;
        this.$refs.layer.style['transform']=`translateY(${translateY}px)`;
        console.log(this.minTranslateY);
        console.log(newY);
        if(newY<this.minTranslateY){
          this.$refs.bgImage.style['padding-top']='40px';
          this.$refs.bgImage.style['z-index']='20';

        }
        else if(newY>0){
          this.$refs.bgImage.style['padding-top']='70%';
        }
        else if(newY>this.minTranslateY){
          this.$refs.layer.style['transform']=`translateY(${translateY}px)`;
          let top=newY-this.minTranslateY+40;
          this.$refs.bgImage.style['padding-top']=top+'px';
        }
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
