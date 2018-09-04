<template>
	<div ref="wrapper">
    <slot></slot>
	</div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props:{
      probeType:{
        type:Number,
        default:1
      },
      click:{
        type:Boolean,
        default:true
      },
      data:{
        type:Array,
        default:null
      },
      listenScroll:{
        type:Boolean,
        default:false
      },
      pullup:{
        type:Boolean,
        default:false
      },
      beforeScroll:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      setTimeout(()=>{
        this._initScroll();
      },20)
    },
    methods:{
      _initScroll(){
        if(!this.$refs.wrapper){
          return;
        }
        else{
          this.scroll=new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:this.click
          })
        }
        //监听滚动事件
        if(this.listenScroll){
          let me=this;
          this.scroll.on('scroll',(pos)=>{
            me.$emit('scroll',pos)
          })
        }
        //监听上拉加载（实质监听滚动结束事件判断是否滚动到底部，如果是就派发事件出去告诉外部）
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        //监听开始滚动事件
        if(this.beforeScroll){
          this.scroll.on('beforeScrollStart',()=>{
            this.$emit('beforeScroll')
          })
        }
      },
      enable(){
        this.scroll && this.scroll.enable()
      },
      disable(){
        this.scroll && this.scroll.disable()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      scrollTo(){
        this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
      },
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
      }
    },
    data(){
      return {}
    },
    watch:{
      data(){
        setTimeout(()=>{
          this.refresh()
        },20)
      }
    }
  }
</script>

<style>

</style>
