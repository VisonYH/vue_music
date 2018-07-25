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
      // console.log(this.$refs.wrapper.clientHeight)
      this.scroll = new BScroll(this.$refs.wrapper)
    }, 2000)
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100%
  height 100%
  overflow hidden
</style>
