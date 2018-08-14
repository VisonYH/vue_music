<style lang="stylus" scoped>
@import '~common/stylus/variable'
.randomPlayBtn
  bottom 20px
  font-size 0
  width auto
  border 1px solid $color-theme
  border-radius 100px
  padding 8px 16px
  .icon-play
    padding 0 5px
    font-size $font-size-medium
    vertical-align middle
  .rbtn
    font-size $font-size-small
    vertical-align middle
</style>

<template>
  <div class="randomPlayBtn">
    <i class="icon-play"></i>
    <span class="rbtn" @click="randomPlay">随机播放全部</span>
  </div>
</template>

<script>
export default {
  methods: {
    randomPlay () {
      this.$emit('randomPlay')
    }
  }
}
</script>
