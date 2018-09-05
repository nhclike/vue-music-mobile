<template>
	<div class="search-list">
    <ul>
      <li class="search-item" @click="selectItem(item)" v-for="item in list">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="delItem(item)">
          <i class="icon-delete" ></i>
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
    },
    methods:{
      delItem(item){
        this.$emit('delete',item)
      },
      selectItem(item){
        this.$emit('select',item)
      }
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
