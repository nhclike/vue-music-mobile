<template>
	<div class="search-list">
    <ul>
      <li class="search-item" v-for="item in list">
        <span class="text">{{item.name}}</span>
        <span class="icon">
          <i class="icon-delete"></i>
        </span>

      </li>
    </ul>
	</div>
</template>

<script>
  export default {
    props:{
      list:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {}
    }
  }
</script>

<style scoped lang="less">
 @import "./../../common/css/variable.less";
.search-list{
  .search-item{
    display: flex;
    align-items: center;
    height: 40px;
    .text{
      flex:1;
      color:@color-text-l;

    }
    .icon{
      .icon-delete{
        font-size: @font-size-small;
        color:@color-text-d;
      }

    }
  }
}
</style>
