<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box></search-box>
    </div>

  </div>
</template>

<script  type="text/ecmascript-6">
  import SearchBox from '@/base/search-box/search-box'
  export default {
    data(){
      return {}
    },
    components:{
      SearchBox
    }
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable";
  h1{
    color:#fff
  }
  .search{
    position: fixed;
    top:80px;
    bottom: 0;
    width: 100%;
  }
</style>
