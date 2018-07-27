<template>
  <div class="singer">
    <list-view :data="singers" @itemClick="singerClick">

    </list-view>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  const HOT_NAME="热门歌曲";
  const HOT_SINGER_LEN=10;
  import {getSingerList} from '@/api/singer'
  import {ERR_OK} from '@/api/config'
  import Singer from '@/common/js/singer'

  import ListView from '@/base/listView/listView'
  export default {
    data(){
      return {
          singers:[]
      }
    },
    created(){
      /*setTimeout(()=>{
        this._getSingerList();

      },1000)*/
      this._getSingerList();
    },
    components:{
      ListView,

    },
    methods:{
        _getSingerList(){
          getSingerList().then((response)=>{
              if(response.code==ERR_OK){

                  this.singers=this._normalizeSinger(response.data.list);
                  //console.log(this.singers);
              }
          })
        },
        _normalizeSinger(list){ //构建需要的singer数据
          let map={
            hot:{
              title:HOT_NAME,
              items:[]
            }
          }
          list.forEach((item,index)=>{
            if(index<HOT_SINGER_LEN){
              map.hot.items.push(new Singer({
                id:item.Fsinger_mid,
                name:item.Fsinger_name,
                sid:item.Fsinger_id
              }))
            }
            const key=item.Findex;
            if(!map[key]){
              map[key]={
                title:key,
                items:[]
              }
            }
            map[key].items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name,
              sid:item.Fsinger_id
            }));

          });
          //console.log(map);
          //为了得到有序的数组我们需要进行排序处理
          let hot=[],ret=[];
          for(var key in map){
            let val=map[key];
            if(val.title.match( /^[a-zA-Z]+$/)){
              ret.push(val)
            }
            else if(val.title==HOT_NAME){
              hot.push(val)
            }
          }
          ret.sort((a,b)=>{
            return a.title.charCodeAt(0)-b.title.charCodeAt(0);
          });
          return hot.concat(ret)
      },
      singerClick(item){
          console.log(item);
          this.$router.push({
            path:'/singer/detail',
            query: item
          })
      }
    }
  }
</script>

<style scoped lang="less">
  div.singer{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
