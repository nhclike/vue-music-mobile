<template>
	<div>
    <scroll class="listview" :data="data">
      <ul>
        <li v-for="group in data" class="list-group">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul >
            <li v-for="item in group.items" class="list-group-item">
              <img v-lazy="item.avatar" class="avatar" alt="">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
	</div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading.vue'

  export default {
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {}
    },
    components:{
      Scroll
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
  }
</style>
