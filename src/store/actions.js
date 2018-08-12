import Types from './mutation-types'
import { playMode } from 'common/js/config'
import Shuffle from 'common/js/shuffle'
export const selectSong = ({commit, state}, {list, index}) => {
  commit(Types.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    commit(Types.SET_PLAYLIST, Shuffle(list))
  } else {
    commit(Types.SET_PLAYLIST, list)
  }
  commit(Types.SET_CURRENTINDEX, index)
  commit(Types.SET_FULLSCREEN, true)
  commit(Types.SET_PLAYINGSTATE, true)
}
