export const singer = state => state.selectedSinger

export const playing = state => state.playing

export const mode = state => state.mode

export const sequenceList = state => state.sequenceList

export const playlist = state => state.playlist

export const currentIndex = state => state.currentIndex

export const fullScreen = state => state.fullScreen

export const currentSong = state => {
  return state.playlist[state.currentIndex] || {}
}

export const historyList = state => {
  return state.historyList
}

export const favoriteList = state => {
  return state.favoriteList
}
