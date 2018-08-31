<template>
	<div class="search-list">
    <ul>
      <li class="search-item">
        <span class="text">qweqweqweqwe</span>
        <span class="icon">
          <i class="icon-delete"></i>
        </span>

      </li>
    </ul>
	</div>
</template>

<script>
  export default {

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
