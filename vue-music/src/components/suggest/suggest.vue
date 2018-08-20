<template>
	<div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item">
        <div class="icon">
          <i></i>
        </div>
        <div class="name">
          <p class="text"></p>
        </div>
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
.suggest{
  .suggest-list{
    .suggest-item{
       display: flex;
       align-items: center;
    .icon{
       flex: 0 0 30px;
       width: 30px;
      }
    .name{
      flex: 1;
      }
    }
  }
}
</style>
