<template>
	<div class="search-list">
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" @click.stop="selectItem(item)" v-for="item in list">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="delItem(item)">
          <i class="icon-delete" ></i>
        </span>

      </li>
    </transition-group>
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
   &.list-enter-active,&.list-leave-active{
     transition: all 0.1s;
   }
   &.list-enter,&.list-leave-to{
     height: 0;
   }
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
