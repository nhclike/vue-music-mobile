import * as types from './mutation-types'
import {shuffle} from '@/common/js/util.js'
import {playMode} from '@/common/js/config.js';

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
/*选择播放当前是什么播放模式就保留播放模式，对播放列表和当前播放index做适配*/
export const selectPlay=function ({commit,state},{list,index}) {

  if (state.mode === playMode.random) {
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_SEQUENCE_LIST,list);
  commit(types.SET_CURRENT_INDEX,index);
  commit(types.SET_FULL_SCREEN,true);
  commit(types.SET_PLAYING_STATE,true);
};

/*随机播放，设置播放模式为随机播放，同时匹配播放列表打乱*/
export const randomPlay=function ({commit,state},{list}) {
  let plist=shuffle(list);
  commit(types.SET_PLAYLIST,plist);
  commit(types.SET_SEQUENCE_LIST,list);
  commit(types.SET_PLAY_MODE,playMode.random);
  commit(types.SET_CURRENT_INDEX,0);
  commit(types.SET_FULL_SCREEN,true);
  commit(types.SET_PLAYING_STATE,true);
};

//插入一首歌曲播放
export const insertSong=function ({commit,state},song) {
  let playList=state.playList.slice();
  let sequenceList=state.sequenceList.slice();
  let currentIndex=state.currentIndex;
  //记录当前歌曲
  let currentSong=playList[currentIndex];
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playList, song);
  // 因为是插入歌曲，所以索引+1
  currentIndex++;
  // 插入这首歌到当前索引位置
  playList.splice(currentIndex, 0, song);
  //已经有这首歌则从playList中删除这首歌
  if(fpIndex>-1){
    //如果插入这首歌的位置在 这首歌原本在列表的位置 之后
    if(currentIndex>fpIndex){
      playList.splice(fpIndex,1);
      currentIndex--;
    } else{
      playList.splice(fpIndex+1,1);
    }
  }

  //修改sequenceList
  //找到当前要插入的位置
  let currentSIndex=findIndex(sequenceList,currentSong)+1;

  //判断这首歌在sequenceList中是否存在
  let fsIndex=findIndex(sequenceList,song);

  //如果这首歌在sequenceList中存在
  if(fsIndex>-1){
    //如果插入的位置在它原本的位置之后
    if(currentSIndex>fsIndex){
      sequenceList.splice(fsIndex,1);
    }
    else{
      sequenceList.splice(fsIndex+1,1);
    }
  }

  //提交mutation
  commit(types.SET_PLAYLIST,playList);
  commit(types.SET_SEQUENCE_LIST,sequenceList);
  commit(types.SET_CURRENT_INDEX,currentIndex);
  commit(types.SET_FULL_SCREEN,true);
  commit(types.SET_PLAYING_STATE,true);
};
