<template>
    <div class="search-box">
      <i class="icon-search"></i>
      <input type="text" v-model="query" class="box" :placeholder="placeholder" ref="query">
      <i @click="clear" class="icon-dismiss" v-show="this.query"></i>
    </div>
</template>


<script>
  import {debounce} from '@/common/js/util.js'

  export default{
      props: {
        placeholder: {
          type: String,
          default: '搜索歌曲、歌手'
        }
      },
      data () {
        return {
          query: ''
        }
      },
      methods:{
        clear(){
          this.query=''
        },
        setQuery(query){
          this.query=query
        },
        blur(){
          this.$refs.query.blur();
        }
      },
      created(){
        this.$watch('query',debounce((newQuery)=>{
          this.$emit('query',newQuery)
        },200))
      }
    }
</script>

<style scoped lang="less">
    @import "./../../common/css/variable.less";
  .search-box{
    display: flex;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 6px;
    align-items: center;
    background: @color-highlight-background;
    border-radius: 6px;
    .icon-search{
      font-size: 24px;
      color: @color-background
    }
    .box{
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: @color-highlight-background;
      color: @color-text;

      outline: 0;
      &::placeholder{
      color: @color-text-d
     }
    }
    .icon-dismiss{
      font-size: 16px;
      color:  @color-text
    }
  }
</style>
