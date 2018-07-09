<template>
  <div>
    <div class="loading">
      <img src="./loading.gif" width="30" height="30" alt="">
      <div class="text">{{text}}</div>
    </div>
  </div>
</template>

<script>

 export default{
     props:{
       text:{
           type:String,
         default:'正在载入...'
       }
     },
     data(){
         return{

         }
    }
 }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable";
  .loading{
    width: 100%;
    text-align: center;
    .text{
      line-height:20px;
      font-size:@font-size-small;
      color:@color-text-l
    }
  }
</style>
