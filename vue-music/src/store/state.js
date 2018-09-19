import {playMode} from '@/common/js/config.js'
import {loadSearch,loadPlay,loadFavorite} from '@/common/js/cache.js'
const state={
  singer:{},                   //歌手数据（歌手列表到歌手详情页面的数据传递）
  playing:false,               //播放状态
  fullScreen:false,            //是否全屏
  playList:[],                 //播放列表
  sequenceList:[],             //顺序列表
  mode:playMode.sequence,      //播放模式
  currentIndex:-1,             //当前播放index相对于playlist
  disc:{},                     //热门歌单详情数据（推荐页面列表到详情页面的数据传递）
  topList:{},                  //排行榜列表数据（排行榜页面列表到排行详情页面的数据传递）
  searchHistory:loadSearch(),  //搜索历史存储的是搜索的字符串
  playHistory:loadPlay(),       //播放历史存储的是播放过的歌曲对象
  favoriteList:loadFavorite()  //个人收藏列表
};

export default state
