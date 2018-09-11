<template>
	<div class="player" v-show="playList.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.image" alt="" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
        <div class="middle" @touchstart.prevent="middleTouchStart"
                            @touchmove.prevent="middleTouchMove"
                            @touchend.prevent="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper" >
              <div class="cd" :class="addCls">
                <img :src="currentSong.image" class="image" alt="">

              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p v-for="(line,index) in currentLyric.lines" class="text" ref="lyricLine"  :class="{'current':currentLineNum==index}">
                  {{line.txt}}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l"> {{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i :class="iconMode" @click="changeMode"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev" @click="prev" :class="disableCls"></i>
            </div>
            <div class="icon i-center">
              <i  @click="togglePlay" :class="playIcon"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next" @click="next" :class="disableCls"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon" :class="addCls">
          <img :src="currentSong.image" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="name" >{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="togglePlay" :class="miniPlayIcon" class="icon-mini"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlayList">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <play-list ref="playlist"></play-list>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @ended="end" @timeupdate="updateTime"></audio>
	</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations,mapActions} from 'vuex';
  import animations from 'create-keyframe-animation';
  import {prefixStyle} from '@/common/js/dom';
  import ProgressBar from '@/base/progress-bar/progress-bar'
  import ProgressCircle from '@/base/progress-circle/progress-circle';
  import {playMode} from '@/common/js/config.js';
  import Lyric from 'lyric-parser'
  import Scroll from '@/base/scroll/scroll'
  import PlayList from '@/components/playlist/playlist'
  import {playerMixin} from '@/common/js/mixin.js'
  const transform = prefixStyle('transform');
  const transitionDuration = prefixStyle('transitionDuration');
  export default {
    mixins:[playerMixin],
    data(){
      return {
        songReady:false,
        currentTime:0,
        radius:32,
        currentLyric:null,
        currentLineNum:0,
        currentShow:'cd',
        playingLyric:''
      }
    },
    components:{
      ProgressBar,
      ProgressCircle,
      Scroll,
      PlayList
    },
    computed:{
      ...mapGetters([  //获取暴露出vuex中的变量
        'fullScreen',
        'playing',
        'currentIndex',
      ]),
      playIcon(){
        //console.log(this.playing);
        return this.playing?'icon-play':'icon-pause'
      },
      miniPlayIcon(){
        return this.playing?'icon-play-mini':'icon-pause-mini'
      },
      addCls(){
        return this.playing?'play':'play pause'
      },

      disableCls(){
        return this.songReady?'':'disable'
      },
      percent(){
        let percent=parseFloat(this.currentTime/this.currentSong.duration);

        return percent>0?percent:0
      }
    },
    created(){
     // console.log('created');
      this.touch={}

    },
    mounted(){
     // console.log('mounted');
    },
    updated(){ //updated之后才可以打印出来vuex中变量改变的值
      //console.log('updated');
      setTimeout(()=>{
        //console.log(this.fullScreen);
        //console.log(this.playList);
        //console.log(this.currentSong)
      },1000)
    },
    methods:{
      back(){
        this.setFullScreen(false);
      },
      open(){
        this.setFullScreen(true);
      },
      enter(el, done) { //利用钩子函数动态操作动画
        const {x, y, scale} = this._getPosAndScale();
        const obj=this._getPosAndScale();
        //console.log(obj);
        //console.log(x);
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        };

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        });

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move');
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s';
        const {x, y, scale} = this._getPosAndScale();
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = '';
        this.$refs.cdWrapper.style[transform] = '';
      },
      _getPosAndScale() {
        const targetWidth = 40;
        const paddingLeft = 40;
        const paddingBottom = 30;
        const paddingTop = 80;
        const width = window.innerWidth * 0.8;
        const scale = targetWidth / width;
        const x = -(window.innerWidth / 2 - paddingLeft);
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
        return {
          x,
          y,
          scale
        }
      },
      togglePlay(){
        //console.log('togglePlay');
        if(this.playing){
          this.setPlayingState(false);
        }
        else{
          this.setPlayingState(true);
        }
        if(this.currentLyric){
          this.currentLyric.togglePlay();
        }
      },
      prev(){
        if(!this.songReady){ //歌曲信息没准备好
          return;
        }
        //console.log('prev song');
        if(this.playList.length===1){
          this.loop()
        }
        else{
          let index=this.currentIndex+1;
          if(index==this.playList.length){
            index=0;
          }

          this.setCurrentIndex(index);   //vuex中index改变currentSong就会改变，调play()
          let playS=this.playing;  //点击下首歌时候先判断下当前播放状态，当前是暂停的场景下点击下首歌则先将播放状态改为暂停

          if(!playS){
            this.togglePlay()
          }
        }

        this.songReady=false;
      },
      next(){
        //console.log('next song')
        if(!this.songReady){ //歌曲信息没准备好
          return;
        }
        if(this.playList.length===1){
          this.loop()
        }
        else{
          let index=this.currentIndex-1;
          if(index==-1){
            index=this.playList.length-1;
          }
          this.setCurrentIndex(index);
          let playS=this.playing;  //点击下首歌时候先判断下当前播放状态，当前是暂停的场景下点击下首歌则先将播放状态改为暂停

          if(!playS){
            this.togglePlay()
          }
        }

        this.songReady=false;

      },
      ready(){
        //console.log('canplay')
        this.songReady=true;  //歌曲准备好了
        //此时记录播放的歌曲
        this.savePlayHistory(this.currentSong)
      },
      error(){
        this.songReady=true;  //歌曲准备好了

      },
      end(){
        if(this.mode===playMode.loop){
          this.loop();
        }else{
          this.next()
        }
      },
      loop(){
        this.$refs.audio.currentTime=0;
        this.$refs.audio.play();
        if(this.currentLyric){
          this.currentLyric.seek(0);
        }
      },
      updateTime(e){
        //console.log(e.target.currentTime);
        this.currentTime=e.target.currentTime;
      },
      format(interval){  //时间格式化成时分秒
        interval=Math.floor(interval);
        const minute=parseInt(interval/60);
        const second=this.addZero(parseInt(interval%60));
        return `${minute}:${second}`
      },
      addZero(num,n=2){ //补0操作
        var len=num.toString().length;
        while (len<n){
          num='0'+num;
          len++;
        }
        return num
      },
      percentChange(pre){      //监听到pregress-bar组件拖动改变播放进度事件
        //console.log(pre);
        const currentTime=this.currentSong.duration*pre;
        this.$refs.audio.currentTime=currentTime;
        if(this.currentLyric){
          this.currentLyric.seek(currentTime*1000);
        }
        if(!this.playing){     //在暂停的状态拖动后让其播放
          this.togglePlay();
        }
      },

      _getLyric(){
        this.currentSong.getLyric().then((lyric)=>{
          this.currentLyric=new Lyric(lyric,this.handleLyric);
          if(this.playing){
            this.currentLyric.play();
          }
          //console.log(this.currentLyric);
        }).catch(()=>{
          this.currentLyric=null;
          this.playingLyric='';
          this.currentLineNum=0;
        })
      },
      handleLyric({lineNum,txt}){
        this.currentLineNum=lineNum;
        if(lineNum>5){
          let lineEle=this.$refs.lyricLine[lineNum-5];
          this.$refs.lyricList.scrollToElement(lineEle,1000);
        }
        else{
          this.$refs.lyricList.scrollTo(0);
        }
        this.playingLyric=txt;
      },
      middleTouchStart(e){
        this.touch.initTouch=true;
        this.touch.startX=e.touches[0].pageX;
        this.touch.startY=e.touches[0].pageY;

      },
      middleTouchMove(e){
        if(!this.touch.initTouch){
          return ;
        }
        let moveX=e.touches[0].pageX-this.touch.startX;
        let moveY=e.touches[0].pageY- this.touch.startY
        if(Math.abs(moveY)>Math.abs(moveX)){   //纵轴的偏差大于横轴，认为是上下滚动歌词
         return ;
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + moveX));
        this.touch.precent=Math.abs(offsetWidth/window.innerWidth);
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
        let time=300;
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;
        //console.log(this.$refs.lyricList)
        this.$refs.middleL.style.opacity=1-this.touch.precent;
        this.$refs.middleL.style.transitionDuration= `${time}ms`;
      },
      middleTouchEnd(e){
        this.touch.initTouch=false;
        let offsetWidth;
        let opacity;
        if(this.currentShow=='cd'){
          if(this.touch.precent>0.1){
            offsetWidth=-window.innerWidth;
            opacity=0;
            this.currentShow='lyric'
          }
          else {
            offsetWidth=0;
            opacity=1;

          }
        }
        else{
          if(this.touch.precent<0.9){
            offsetWidth=0;
            this.currentShow='cd';
            opacity=1;
          }
          else {
            offsetWidth=-window.innerWidth;
            opacity=0;
          }
        }
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.middleL.style.opacity=opacity;
      },
      showPlayList(){
        this.$refs.playlist.show()
      },
      ...mapMutations(        //不能直接修改vuex中的变量,通过映射方法传参数的方式提交改变vuex中的参数
        {
          setFullScreen:'SET_FULL_SCREEN',
          setPlayingState:'SET_PLAYING_STATE',

        }
      ),
      ...mapActions([
         'savePlayHistory'
      ])
    },
    watch:{
      currentSong(newSong,oldSong){ //监听当前歌曲信息的变化            //id不变不执行play()
        if(!newSong.id){  //删除歌曲列表导致currentSong为空，过滤报错
          return ;
        }
        if(newSong.id===oldSong.id){
          return ;
        }
        if(this.currentLyric){
          this.currentLyric.stop();
        }
        this.$nextTick(()=>{
          //dom元素更新后执行，此时能拿到audio元素的属性,调播放的方法并且改变播放状态为true
          this.$refs.audio.play();
          //this.currentSong.getLyric(); //调用获取歌词的方法
          //console.log(newSong.lyric);  //此时直接console.log会发现为undefined因为getLyric中发送的请求为异步，请求回来后才有值
                                          //解决方案：让getLyric返回一个Promise
          this._getLyric();
        })
      },
      playing(newPlay){  //监听当前的播放状态
        //console.log(newPlay);
        this.$nextTick(()=>{
          newPlay? this.$refs.audio.play():this.$refs.audio.pause()
        })

      }
    }
  }
 /* 逻辑梳理
 * 1只要currentSong发生改变就调play
 * 2只要进入播放页面，不管从什么地方进入都会提交actions.js中的selectPlay其中会设置playing为true，
 * 也会设置currentIndex因为currentSong是根据currentIndex计算出来的所以currentSong与此同时也会改变
 * 从而确保了进入player时vuex中的playing与页面实际播放状态一致
 * 3点击下首或者上首时提交vuex中的currentIndex,同时引起currentSong改变，调用play,也就是无论点击前进后退都会触发页面调用play方法，
 * 如果在暂停的场景下前进后退会导致页面调了play()开始播放但是vuex中的playing还是之前的false，此时需要改变vuex中的playing为true
 *
 * */
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
  @import "./../../common/css/mixin.less";

  .player{
    .normal-player{
      position: fixed;
      left: 0;
      top:0;
      right: 0;
      bottom: 0;
      z-index: 150;
      background:@color-background;
      color:#fff;
      /*动画效果实现*/
      &.normal-enter-active,&.normal-leave-active{
        transition: all 1s;
        .top,.bottom{
          transition: all 1s;
        }
      }
      &.normal-enter,&.normal-leave-to{
        opacity: 0;
        .top{
          transform: translateY(-100px);
        }
        .bottom{
          transform: translateY(100px);
        }
      }
      .background{
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0.6;
        filter:blur(20px);

      }
      .top{
        position: relative;
        margin-bottom:25px;
        .back{
          position: absolute;
          top:0;
          left: 6px;
          z-index: 50;
          .icon-back{
            display: block;
            padding: 9px;
            font-size: @font-size-large-x;
            color:@color-theme;
            transform: rotate(-90deg);
          }
        }
        .title{
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          font-size: @font-size-large;
          color:@color-text;
        }
        .subtitle{
          line-height: 20px;
          text-align: center;
          font-size: @font-size-medium;
          color:@color-text;
        }
      }
      .middle{
        position: fixed;
        top:80px;
        bottom: 170px;
        left: 0;
        width: 100%;
        .middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          /*旋转CD*/
          .cd-wrapper{
            position: absolute;
            top:0;
            left: 10%;
            height: 100%;
            width: 80%;
            .cd{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255,255,255,.1);
              border-radius: 50%;
             /*旋转CD动画*/
              &.play{
                  animation:rotate  20s linear infinite;
               }
              &.pause{
                 animation-play-state:paused;
               }
              img{
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
          .playing-lyric-wrapper{
            width: 80%;
            margin: 30px auto 0 auto;
            text-align: center;
            overflow:hidden;
            .playing-lyric{
              height: 20px;
              line-height: 20px;
              font-size: @font-size-medium;
              color:@color-text-l;
            }
          }
        }
        .middle-r{
          width: 100%;
          height: 100%;
          vertical-align: top;
          display: inline-block;
          overflow: hidden;
          position:absolute;
          top:0;
          right:-100%;
          .lyric-wrapper{
            width:80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text{
              line-height: 32px;
              color: @color-text-l;
              font-size: @font-size-medium;
              &.current{
                  color:@color-text
               }
            }
          }
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        left: 0;
        width: 100%;
        .dot-wrapper{
          text-align: center;
          font-size: 0;
          .dot{
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius:50%;
            background: @color-text-l;
            &.active{
             width:20px;
             border-radius:5px;
             background:@color-text-ll;
            }
          }
        }
        /*进度条*/
        .progress-wrapper{
          display: flex;
          align-items: center;
          width:80%;
          margin:0 auto;
          .time{
            flex: 0 0 30px;
            height: 30px;
            line-height: 30px;
            color: @color-text;
            font-size: @font-size-small;
            width: 30px;
          }
          .progress-bar-wrapper{
            flex: 1;
          }

        }
        .operators{
          display: flex;
          align-items:center;
          .icon{
            flex:1;
            color:@color-theme;
            i.disable{
                color:gray;
             }
            &.i-left{
              text-align: right;
              i{
                font-size: 30px;
              }
            }
            &.i-center{
              text-align: center;
              padding:0 20px;
              i{
                font-size: 40px;
              }
            }
            &.i-right{
              text-align: left;
              i{
                 font-size: 30px;
              }
            }
          }
        }
      }
    }
    .mini-player{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background:@color-highlight-background;
      .icon{
        padding: 0 10px 0 20px;
        width: 40px;
        flex:0 0 40px;  /*有多余空间也不放大，挤压也不缩小，固定占据空间40px*/
        &.play{
           animation:rotate  20s linear infinite;
         }
        &.pause{
           animation-play-state:paused;
         }
        img{
          border-radius: 50%;
        }
      }
      .text{
        line-height: 20px;
        flex:1;   /*有多余空间就放大*/
        .name{
          color:@color-text;
          font-size: @font-size-medium;
        }
        .desc{
          color:@color-text-d;
          font-size: @font-size-small;
        }
      }
      .control{
        flex:0 0 30px;  /*有多余空间也不放大，挤压也不缩小，固定占据空间30px*/
        width: 30px;
        padding: 0 10px;
        .icon-play-mini, .icon-pause-mini,.icon-playlist{
          font-size: 30px;
          color:@color-theme-d
        }
        .icon-mini{
          font-size: 32px;
          position: absolute;
          top:0;
          left: 0;
        }
      }
    }
  }



 .mini-enter-active,.mini-leave-active{
    transition: all 0.5s;
  }
  .mini-enter,.mini-leave-to{
    opacity: 0;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
