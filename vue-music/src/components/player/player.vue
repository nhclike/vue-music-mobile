<template>
	<div class="player" v-show="playList.length>0">
    <transition name="normal">
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
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <img :src="currentSong.image" class="image" alt="">

              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">

          </div>
          <div class="progress-wrapper">

          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-play"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
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
        <div class="icon">
          <img :src="currentSong.image" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="name" >{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control">
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>

	</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex';
  import animations from 'create-keyframe-animation';
  export default {
    data(){
      return {}
    },
    computed:{
      ...mapGetters([  //获取暴露出vuex中的变量
        'fullScreen',
        'playList',
        'currentSong'
      ])
    },
    created(){
      console.log('created');
    },
    mounted(){
      console.log('mounted');

    },
    updated(){ //updated之后才可以打印出来vuex中变量改变的值
      console.log('updated');

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
      ...mapMutations( //不能直接修改vuex中的变量,通过映射方法传参数的方式提交改变vuex中的参数
        {
          setFullScreen:'SET_FULL_SCREEN'
        }
      )
    }
  }
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
/*
        transform: translateY(100%);
*/
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
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
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
              border: 10px solid rgba(255,255,255,0.1);
              border-radius: 50%;
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
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        left: 0;
        width: 100%;
        .operators{
          display: flex;
          align-items:center;
          .icon{
            flex:1;
            color:@color-theme;
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
        .icon-playlist{
          font-size: 30px;
          color:@color-theme-d
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
</style>
