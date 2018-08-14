<template>
  <div class="wrapper" ref="wrapper">
    <slot class="content"></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    scrollTo: {
      type: Number,
      default: 0
    },
    click: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', -pos.y)
        })
      }
    }, 20)
  },
  methods: {
    disable () {
      this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
      // console.log('refreshed')
    },
    scrollToPos (height) {
      this.scroll.scrollTo(0, -height, 700)
    }
  },
  watch: {
    scrollTo (height) {
      this.scroll.scrollTo(0, -height)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100%
  height 100%
</style>
