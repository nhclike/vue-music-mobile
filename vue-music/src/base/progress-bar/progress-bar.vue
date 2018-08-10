<template>
	<div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress">

      </div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  const progressBtnWidth=16;
  import {prefixStyle} from '@/common/js/dom.js'
  const transform=prefixStyle('transform');
  export default {
    data(){
      return {}
    },
    props:{
      percent:{
        type:Number,
        default:0
      }
    },
    updata(){
      //console.log(this.percent)
    },
    methods:{
      progressTouchStart(e){
        this.$emit('progressTouchStart')
      },
      progressTouchMove(){

      },
      progressTouchEnd(){
        
      }
    },
    watch:{
      percent(newPercent){
        console.log(newPercent)
        if(newPercent>0){
          const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
          const offsetWidth=barWidth*newPercent;
          console.log(offsetWidth);
          this.$refs.progress.style.width=`${offsetWidth}px`;  //设置底部进度条宽度
          this.$refs.progressBtn.style[transform]=`translateX(${offsetWidth}px)`;  //设置进度条球的偏移
        }
      }
    }
  }
</script>

<style scoped lang="less">
@import "./../../common/css/variable.less";
  .progress-bar{
    height: 30px;
    .bar-inner{
      position: relative;
      top:13px;
      height: 4px;
      background: rgba(0,0,0,0.3);
      .progress{
        position: absolute;
        height: 100%;
        background-color: @color-theme;
      }
      .progress-btn-wrapper{
        position:absolute;
        left:-8px;
        top:-13px;
        width:30px;
        height:30px;
        .progress-btn{
          position: relative;
          top:7px;
          left:7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border:3px solid @color-text;
          border-radius:50%;
          background: @color-theme;
        }
      }
    }
  }
</style>
