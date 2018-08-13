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
