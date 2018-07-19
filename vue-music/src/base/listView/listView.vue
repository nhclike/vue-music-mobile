<template>
    <scroll class="listview"
            :data="data"
            :listenScroll="listenScroll"
            @scroll="scroll"
            ref="listview">
      <ul>
        <li v-for="group in data" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul >
            <li v-for="item in group.items" class="list-group-item">
              <img v-lazy="item.avatar" class="avatar" alt="">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut"   @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
        <ul>
          <li class="item" v-for="(item,index) in shotcutList" :data-index="index" :class="{current: currentIndex==index}">
            {{item}}
          </li>
        </ul>
      </div>
    </scroll>
</template>

<script>
  import Scroll from '@/base/scroll/scroll.vue'
  import Loading from '@/base/loading/loading.vue'
  import {getData} from '@/common/js/dom.js'
  export default {
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {
        scrollY:-1,
        currentIndex:0
      }
    },
    created(){
      this.touch={};
      this.listenScroll=true
    },
    computed:{
      shotcutList(){
        return this.data.map((group)=>{
          return group.title.substr(0,1)
        })
      }
    },
    components:{
      Scroll,
      Loading
    },
    methods:{
      onShortCutTouchStart(e){
        let achorIndex=getData(e.target,'index');
        let firstTouch=e.touches[0].pageY;
        this.touch.y1=firstTouch;
        this.touch.achorIndex=achorIndex;
        this.$refs.listview.scrollToElement(this.$refs.listGroup[achorIndex],0)
      },
      onShortCutTouchMove(e){
        let firstTouch=e.touches[0].pageY;
        this.touch.y2=firstTouch;
        let delData=(this.touch.y2-this.touch.y1)/18 | 0;
        let achorIndex=Number(this.touch.achorIndex)+delData;
        this.$refs.listview.scrollToElement(this.$refs.listGroup[achorIndex],0)

      },
      scroll(pos){
        console.log(pos)
        this.scrollY=pos.y;
      },
      _calculateHeight(){

      }
    },
    watch:{
      data(){
        setTimeout(()=>{
          this._calculateHeight()
        },20)
      }
    }
  }
</script>

<style  scoped lang="less">
  @import "./../../common/css/variable.less";
  .listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background:@color-background;
    .list-group{
      padding-bottom: 30px;
      .list-group-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: @font-size-small;
        color:@color-text-l;
        background:@color-highlight-background;
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
        }
        .name {
          color: #fff;
          margin-left: 20px;
          font-size: @font-size-medium;
        }
      }
    }
    .list-shortcut{
      position: absolute;
      top:50%;
      right: 0;
      transform:translateY(-50%);
      width:20px;
      text-align:center;
      background:@color-background-d;
      font-family:Helvetica;
      padding:20px 0;
      border-radius:10px;
      ul{
        li.item{
          padding:3px;
          color: @color-text-l;
          line-height: 1;
          font-size: @font-size-small;
          &.current{
           color:@color-theme;
          }
        }
      }
    }
  }
</style>
