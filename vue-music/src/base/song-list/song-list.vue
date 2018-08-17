<template>
	<div class="song-list">
    <ul >
      <li class="item"  v-for="(song,index) in songs" @click="selectItem(song,index)">
        <div class="rank" v-show="rank">
          <span :class="getIconCls(index)" v-text="getRandTxt(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
    <div class="load-container" v-show="!songs.length">
      <loading></loading>
    </div>
	</div>
</template>

<script>
  import Loading from '@/base/loading/loading'
  export default {
    props:{
      songs:{
        type:Array,
        default:[]
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {}
    },
    methods: {
      getDesc(song) {
        return `${song.singer}·${song.album}`
      },
      selectItem(item,index){
        this.$emit('selectItem',item,index);
      },
      getIconCls(index){
         let cls=''
        if(index<3){
          cls='icon icon'+index;
        }
        else{
          cls='text'
        }
        return cls;
      },
      getRandTxt(index){
        let txt='';
        if(index>2){
          txt=index+1
        }
        return txt;
      }

    },
    components:{
      Loading
    }
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
  @import "./../../common/css/mixin.less";
  .song-list{

  }
  .load-container{

  }
 .item{
   display: flex;
   align-items: center;
   box-sizing: border-box;
   height: 64px;
   font-size: @font-size-medium;
   .rank{
     flex:0 0 25px;
     width: 25px;
     margin-right:30px;
     .icon{
       width: 25px;
       height: 24px;
       display: inline-block;
       background-size:25px 24px;
       &.icon0{
          background-image: url("./first@2x.png");
        }
       &.icon1{
           background-image: url("./second@2x.png");
        }
       &.icon2{
           background-image: url("./third@2x.png");
        }
     }
      .text{
        font-size: @font-size-large;
        color:@color-theme;
      }
   }
   .content{
     flex: 1;
     line-height: 20px;
     overflow: hidden;
     .name{
       color:@color-text;
       line-height: 20px;

     }
     .desc{
       margin-top: 4px;
       color:@color-text-d;
       line-height: 20px;

     }
   }
 }
</style>
