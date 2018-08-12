<template>
  <div class="slider">
    <div class="wrapper" ref="wrapper" :sliderList="sliderList">
      <ul class="content" ref="content">
        <li class="item" v-for="item in sliderList" :key="item.id">
          <img :src="item.picUrl" alt="轮播图">
        </li>
      </ul>
      <div class="dots">
        <div class="dot-item" v-for="(item, index) in sliderList" :key="item.id" :class="{activeItem: index === activePageIndex}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      activePageIndex: 0
    }
  },
  props: {
    sliderList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {

  },
  watch: {
    sliderList: function () {
      this.$nextTick(() => {
        this._initWidth()
        this._initSliders()
        this._play()
      })
    }
  },
  methods: {
    _initSliders () {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 400
        },
        bounce: false,
        stopPropagation: true,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        this._play()
        this.activePageIndex = this.slider.getCurrentPage().pageX
      })
    },
    _initWidth () {
      this.$refs.content.style.width = (this.sliderList.length + 2) * this.$refs.content.clientWidth + 'px'
      for (let item of this.$refs.content.children) {
        item.style.width = this.$refs.wrapper.clientWidth + 'px'
        item.className += item.className + ' slideItem'
      }
    },
    _play () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.slider.next()
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
.slider
  width 100%
  overflow hidden
  .wrapper
    overflow hidden
    position relative
    .content
      overflow hidden
      white-space: nowrap
      .slideItem
        float left
        img
          width 100%
    .dots
      margin 0 auto
      position absolute
      bottom 10px
      left 0
      right 0
      text-align center
      .dot-item
        display inline-block
        width 8px
        height 8px
        border-radius 50%
        background $color-text-ll
        margin-left 8px
        &:first-child
          margin-left 0
        &.activeItem
          width 20px
          border-radius 5px
          background #ffffff
</style>
