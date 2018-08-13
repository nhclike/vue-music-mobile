<template>
	<div class="progress-bar" ref="progressBar"            @click="progressClick"
  >
    <div class="bar-inner">
      <div class="progress" ref="progress">

      </div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd"
           @click="progressClick"
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
    created(){
      this.touch={};

    },
    methods:{
      progressTouchStart(e){
        this.touch.initiated=true;
        this.touch.startX=e.touches[0].pageX;               //开始拖动时的位置
        this.touch.left=this.$refs.progress.clientWidth;    //开始拖动时相对进度条背景的偏移量

      },
      progressTouchMove(e){
        if(!this.touch.initiated){                          //没有触发start直接触发move直接return
          return ;
        }
        const  deltaX=e.touches[0].pageX-this.touch.startX;
        const offsetWidth=Math.min(Math.max(0,this.touch.left+deltaX),this.$refs.progressBar.clientWidth-progressBtnWidth);
        this._offset(offsetWidth)
      },
      progressTouchEnd(e){
        this.touch.initiated=false;  //拖动结束后监听precent又会this._offset(offsetWidth);使得其回到原来正常的位置
        this._triggerPercent();      //向外面派发出事件改变播放进度
      },
      progressClick(e){
        const rect = this.$refs.progressBar.getBoundingClientRect();  //返回的是元素的top.left.right.bottom构成的对象
        const offsetWidth = e.pageX - rect.left;
        this._offset(offsetWidth);
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
        // this._offset(e.offsetX)
        this._triggerPercent();

      },
      _triggerPercent(){
        const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
        const percent=this.$refs.progress.clientWidth/barWidth;
        this.$emit('percentChange',percent);
      },
      _offset(offsetWidth){
        this.$refs.progress.style.width=`${offsetWidth}px`;  //设置底部进度条宽度
        this.$refs.progressBtn.style[transform]=`translateX(${offsetWidth}px)`;  //设置进度条球的偏移
      }
    },
    watch:{
      percent(newPercent){
        //console.log(newPercent);
        if(newPercent>0 && !this.touch.initiated){
          const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
          const offsetWidth=barWidth*newPercent;
          //console.log(offsetWidth);
          this._offset(offsetWidth)
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
