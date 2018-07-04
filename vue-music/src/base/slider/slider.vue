<template>
  <div>
    <div class="slider">
      <div class="slider-group">
        <slot></slot>
      </div>
    </div>
    <div class="dots">

    </div>
  </div>
</template>

<script >
  export default {
    props:{
      loop:{
        type:Boolean,
        default:true
      },
      autoPlay:{
        type:Boolean,
        default:true
      },
      interval:{
        type:Number,
        default:4000
      }
    },
    data(){
      return {}
    }

  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
  .slider{
   min-height: 1px;
    .slider-group{
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      a{
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
        img{
          display: block;
          width: 100%;
        }
      }
    }
    .dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
    }
  }
</style>
