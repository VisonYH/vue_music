<style lang="stylus" scoped>

</style>

<template>
  <div @click="changePlayMode">
    <i :class="playModeIcon"></i>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      playMode: 0,
      playModeIcon: 'icon-sequence'
    }
  },
  methods: {
    changePlayMode () {
      if (this.mode === 0) {
        this.playModeIcon = 'icon-loop'
        this.SET_PLAYINGMODE(1)
      } else if (this.mode === 1) {
        this.playModeIcon = 'icon-random'
        this.SET_PLAYINGMODE(2)
        this.selectSong({list: this.playlist, index: 0})
      } else {
        this.playModeIcon = 'icon-sequence'
        this.SET_PLAYINGMODE(0)
        this.selectSong({list: this.sequenceList, index: 0})
      }
    },
    ...mapMutations([
      'SET_PLAYINGMODE'
    ]),
    ...mapActions(['selectSong'])
  },
  computed: {
    ...mapGetters([
      'mode', 'playlist', 'sequenceList'
    ])
  },
  watch: {
    mode (newMode) {
      if (newMode === 0) {
        this.playModeIcon = 'icon-sequence'
      } else if (newMode === 1) {
        this.playModeIcon = 'icon-loop'
      } else {
        this.playModeIcon = 'icon-random'
      }
    }
  }
}
</script>
