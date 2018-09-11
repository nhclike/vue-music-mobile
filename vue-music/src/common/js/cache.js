import storage from 'good-storage'
const SEARCH_KEY='_search_';
const SEARCH_MAX_LENGTH=15;

const PLAY_KEY='_play_';
const PLAY_MAX_LEN=200;
//将一个值插入到数组前面，如果有重复的先删掉数组中原本有的值再插入到前面
function insertArray(arr,val,compare,maxLen) {  //要插入的数组，要插入的值，比较函数，数组限制
  const index=arr.findIndex(compare);
  if(index===0){ //要插入的值本身就在数组的第一位
    return ;
  }
  if(index>0){  //要插入的值再数组里面有且不在第一位
    arr.splice(index,1)   //删除此值
  }
  arr.unshift(val); //此值插入到数组头部
  if(maxLen && arr.length>maxLen){   //超出数组最大长度限制删除最后一个值
    arr.pop()
  }
}


//保存搜索记录存储到storage中
export function saveSearch(query) {
  let searches=storage.get(SEARCH_KEY,[]);
  //将查询的值插入到searches数组的头部
  insertArray(searches,query,(item)=>{
    return item==query
  },SEARCH_MAX_LENGTH);
  //更新storage
  storage.set(SEARCH_KEY,searches)
  return searches;
}

//加载storage存储值
export function loadSearch() {
  let searches=storage.get(SEARCH_KEY,[]);
  return searches
}

//删除记录
export function deleteSearch(query) {
  let searches=storage.get(SEARCH_KEY,[]);
  let delIndex=searches.findIndex((item)=>{
    return item===query
  });
  //console.log(searches);
  //console.log(delIndex);
  if(delIndex>-1){
    searches.splice(delIndex,1);
  }

  storage.set(SEARCH_KEY,searches);
  return searches
}

//清空历史记录
export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return []
}


//保存播放歌曲
export function savePlay(song) {
  let songs=storage.get(PLAY_KEY,[]);
  insertArray(songs,song,(item)=>{
    return item.id==song.id
  },PLAY_MAX_LEN);
  storage.set(PLAY_KEY,songs);
  return songs;
}


//加载播放列表
export function loadPlay() {
  return storage.get(PLAY_KEY,[])
}
