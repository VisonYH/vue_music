<template>
  <div class="slider">
    <div class="wrapper" ref="wrapper">
      <ul class="content">
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
      this.sliderList = res.data.slider
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
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
      .item
        float left
        img
          width 100%
</style>
