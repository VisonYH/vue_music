<style lang="stylus" scoped>
@import '~common/stylus/variable'
.user
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background $color-background
  .returnBtn
    position absolute
    left 6px
    padding 10px
    z-index 100
    color $color-theme
    font-size $font-size-large-x
  .switch
    width 60%
    margin 10px auto 0
  .randomPlay
    position absolute
    left 50%
    top 60px
    transform translate3d(-50%, 0, 0)
    height 32px
    box-sizing border-box
    border-color $color-text-ll
    color $color-text-ll
  .scroll-wrapper
    position absolute
    top 100px
    left 0
    right 0
    margin 0
    bottom 0
    overflow hidden
</style>

<template>
  <div class="user">
    <div class="returnBtn" @click="back"><i class="icon-back"></i></div>
    <myswitch class="switch" :data="['我喜欢的', '最近听的']" @toggle="toggle"></myswitch>
    <random-play class="randomPlay"></random-play>
    <div class="scroll-wrapper" ref="scroll">
      <scroll>
        <song-list :songList="songList" :order="false"></song-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import Switch from 'base/switch/switch'
import RandomPlay from 'base/random-play/random-play'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      songList: [],
      hisList: [],
      leftActive: true,
      favList: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    toggle (bool) {
      this.leftActive = bool
    }
  },
  components: {
    myswitch: Switch,
    RandomPlay,
    Scroll,
    SongList
  },
  computed: {
    ...mapGetters([
      'historyList', 'playlist', 'favoriteList'
    ])
  },
  activated () {
    this.hisList = Object.values(this.historyList)
    this.favList = Object.values(this.favoriteList)
    if (this.playlist.length) {
      this.$refs.scroll.style.bottom = '60px'
    }
  },
  watch: {
    leftActive (newV) {
      if (newV) {
        this.songList = this.favList
      } else {
        this.songList = this.hisList
      }
    }
  }
}
</script>
