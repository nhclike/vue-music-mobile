<template>
    <scroll class="listview"
            :data="data"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll"
            ref="listview">
      <ul>
        <li v-for="group in data" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul >
            <li v-for="item in group.items" class="list-group-item" @click="itemClick(item)">
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
      <div class="fixTitle" v-show="fixTitle"  ref="fixed">
        <h2>{{fixTitle}}</h2>
      </div>
      <div class="load-container" v-show="!data.length">
        <loading></loading>
      </div>
    </scroll>
</template>

<script>
  import Scroll from '@/base/scroll/scroll.vue'
  import Loading from '@/base/loading/loading.vue'
  import {getData} from '@/common/js/dom.js'
  const TITLE_HEIGHT=30;
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
        currentIndex:0,
        diff:-1
      }
    },
    created(){
      //定义滚动组件的参数
      this.touch={};
      this.listenScroll=true;
      this.probeType=3
    },
    computed:{
      shotcutList(){//根据传过来的data计算右边导航数据
        return this.data.map((group)=>{
          return group.title.substr(0,1)
        })
      },
      fixTitle(){//实时计算固定栏上显示
        //console.log(this.data[this.currentIndex])
        if(this.scrollY>0){
          return ''
        }
        return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
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
        this.scrollTo(achorIndex);
      },
      onShortCutTouchMove(e){
        let firstTouch=e.touches[0].pageY;
        this.touch.y2=firstTouch;
        let delData=(this.touch.y2-this.touch.y1)/18 | 0;
        let achorIndex=Number(this.touch.achorIndex)+delData;
        this.scrollTo(achorIndex)
      },
      scroll(pos){ //监听到的滚动组件派发的滚动事件
        this.scrollY=pos.y;
      },
      scrollTo(index){
        if(index){
          //this.currentIndex=index;
          this.scrollY=-this.listHeight[index];
          this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
        }
      },
      _calculateHeight(){  //计算歌手列表各个模块的高度
        this.listHeight=[];
        let height=0;
        this.listHeight.push(height);
        let list=this.$refs.listGroup;
        for(var i=0;i<list.length;i++){
          let item=list[i];
          height +=item.clientHeight;
          this.listHeight.push(height);
        }
      },
      itemClick(item){
        this.$emit('itemClick',item)
      }
    },
    watch:{
      data(){
        setTimeout(()=>{
          this._calculateHeight()
        },20)
      },
      scrollY(newY){
        const lh=this.listHeight;
        //滑到顶部
        if(newY>0){
          this.currentIndex=0;
          return ;
        }
        //滑到中间
        for(var i=0;i<lh.length-1;i++){
          var height1=lh[i];
          var height2=lh[i+1];
          if( (-newY>=height1 && -newY<height2)){
            this.currentIndex=i;
            this.diff=height2+newY;
            //console.log(this.diff);
            /*console.log(newY);
            console.log(this.listHeight);
            console.log(this.currentIndex);*/
            return ;
          }
        }
        //滑到底部
        if(-newY>lh[lh.length-1]){
          this.currentIndex=lh.length-2;
          return ;
        }
      },
      diff(newVal){ //监听2个导航栏相遇时中间差
        //console.log(newVal);
        let fixtop=newVal>0 && newVal<TITLE_HEIGHT? newVal-TITLE_HEIGHT:0;
        //console.log(this.fixtop);
        //console.log(fixtop);
        if(this.fixtop===fixtop){
          return ;
        }
        else{
          this.fixtop=fixtop;
          //console.log(this.$refs.fixed)
          this.$refs.fixed.style.transform=`translateY(${fixtop}px)`
        }
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
    .fixTitle{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      h2{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: @font-size-small;
        color:@color-text-l;
        background:@color-highlight-background;
      }
    }
  }
</style>
