<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.search-list
  padding 10px 30px 0
  .item
    height 35px
    line-height 30px
    font-size 0
    color $color-text-d
    no-wrap()
    .icon
      display inline-block
      vertical-align middle
      width 25px
      height 35px
      line-height 35px
      font-size $font-size-medium
    span
      display inline-block
      vertical-align middle
      line-height 35px
      font-size $font-size-medium
</style>

<template>
  <div class="search-list">
    <div class="singer item" v-if="singer.singermid" @click="selectSinger(singer.singermid)">
      <i class="icon icon-mine"></i>
      <span class="singername" v-html="singer.singername"></span>
    </div>
    <div class="songList item" v-if="songList.length" v-for="song in songList" @click="selectItem(song)" :key="song.mid">
      <i class="icon icon-music"></i>
      <span class="songname" v-html="song.name"></span>
      <span class="dot"> - </span>
      <span class="singername" v-html="song.singer"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singer: {
      type: Object,
      default: () => {
        return {}
      }
    },
    songList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('selectItem', item)
    },
    selectSinger (mid) {
      this.$emit('selectSinger', mid)
    }
  }
}
</script>
