<template>
	<div class="song-list">
    <ul >
      <li class="item"  v-for="(song,index) in songs" @click="selectItem(song,index)">
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
