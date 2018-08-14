import Types from './mutation-types'
import { playMode } from 'common/js/config'
import Shuffle from 'common/js/shuffle'

const findIndex = (list, index, randomlist) => {
  let song = list[index]
  for (let i = 0; i < randomlist.length; i++) {
    if (randomlist[i].id === song.id) {
      return i
    }
  }
}
export const selectSong = ({commit, state}, {list, index}) => {
  commit(Types.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    let randomList = Shuffle(list)
    index = findIndex(list, index, randomList)
    commit(Types.SET_PLAYLIST, randomList)
  } else {
    commit(Types.SET_PLAYLIST, list)
  }
  commit(Types.SET_CURRENTINDEX, index)
  commit(Types.SET_FULLSCREEN, true)
  commit(Types.SET_PLAYINGSTATE, true)
}
