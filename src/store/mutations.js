import Types from './mutation-types'

export default {
  [Types.SELECTE_ALBUM]: (state, payload) => {
    state.selectedAlbum = payload
  },
  [Types.SELECTE_SINGER]: (state, payload) => {
    state.selectedSinger = payload
  },
  [Types.SET_PLAYINGSTATE]: (state, payload) => {
    state.playing = payload
  },
  [Types.SET_FULLSCREEN]: (state, payload) => {
    state.fullScreen = payload
  },
  [Types.SET_PLAYINGMODE]: (state, payload) => {
    state.mode = payload
  },
  [Types.SET_PLAYLIST]: (state, payload) => {
    state.playlist = payload
  },
  [Types.SET_CURRENTINDEX]: (state, payload) => {
    state.currentIndex = payload
  },
  [Types.SET_SEQUENCELIST]: (state, payload) => {
    state.sequenceList = payload
  },
  [Types.SET_HISTORYLIST]: (state, payload) => {
    state.historyList[payload.mid] = payload
  },
  [Types.GET_HISTORYLIST]: (state, payload) => {
    state.historyList = payload
  },
  [Types.SET_FAVORITELIST]: (state, payload) => {
    if (state.favoriteList[payload.mid]) {
      delete state.favoriteList[payload.mid]
    } else {
      state.favoriteList[payload.mid] = payload
    }
  },
  [Types.GET_FAVORITELIST]: (state, payload) => {
    state.favoriteList = payload
  }
}
