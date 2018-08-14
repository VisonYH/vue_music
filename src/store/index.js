import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import CreateLogger from 'vuex/dist/logger'
import { playMode } from 'common/js/config'
Vue.use(Vuex)

const state = {
  selectedAlbum: '', // 当前选择的专辑
  selectedSinger: '', // 当前选择的歌手
  playing: false,
  fullScreen: false,
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1,
  historyList: {}, // 历史听过歌曲
  favoriteList: {} // 收藏歌曲
}
const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [CreateLogger()] : []
})
