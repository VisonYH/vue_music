<template>
  <div class="wrapper" ref="wrapper">
    <slot class="content"></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  mounted () {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
    }, 20)
    this.$nextTick(() => {

    })
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100%
  overflow hidden
  .content
    overflow hidden
    white-space: nowrap
    .item
      float left
      img
        width 100%
</style>
