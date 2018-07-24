<template>
  <div class="slider">
    <div class="wrapper" ref="wrapper">
      <ul class="content" ref="content">
        <li class="item" v-for="item in sliderList" :key="item.id">
          <img :src="item.picUrl" alt="轮播图">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getSliderList } from 'api/recommend'
export default {
  data () {
    return {
      sliderList: []
    }
  },
  created () {
    getSliderList().then(res => {
      if (res.code === 0 && res.data.slider.length !== 0) {
        this.sliderList = res.data.slider
        this.$nextTick(() => {
          this.$refs.content.style.width = this.sliderList.length * this.$refs.content.clientWidth + 'px'
          for (let item of this.$refs.content.children) {
            item.style.width = this.$refs.wrapper.clientWidth + 'px'
            item.className += item.className + ' slideItem'
          }
        })
        setTimeout(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapLoop: true,
            snapThreshold: 0.3,
            snapSpeed: 400
          })
        }, 20)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.slider
  width 100%
  overflow hidden
  .wrapper
    overflow hidden
    .content
      overflow hidden
      white-space: nowrap
      .slideItem
        float left
        img
          width 100%
</style>
