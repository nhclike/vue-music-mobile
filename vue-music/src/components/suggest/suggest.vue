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
  import {search} from '@/api/search.js'
  import {ERR_OK} from '@/api/config.js'

  export default {
    props:{
      query:{
        type:String,
        default:''
      },
      showSinger:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return {
        page:1,
        result:{}
      }
    },
    methods:{
      search(){
        //抓取检索数据
        search(this.query,this.page,this.showSinger,20).then((res)=>{
            //console.log(res)
            if(res.code==ERR_OK){
              this.result=res.data
              var data=res.data;
              console.log(data);
              var t={...data.zhida, ...{type: 2}}
              console.log(t)
            }
        })
      }
    },
    watch:{
      query(val){
        //console.log(val);
        this.search();
      }
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
