<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend
  position absolute
  top: 88px
  bottom 0
  width 100%
  overflow hidden
  .scroll
    width 100%
    height 100%
    .albumRecommend
      .title
        height 65px
        line-height 65px
        text-align center
        color $color-theme
        font-size $font-size-medium
      .albumItem
        display flex
        padding 10px 20px
        .img
          flex 0 0 80px
        .desc
          flex 1
          display flex
          flex-direction column
          justify-content center
          color $color-text-ll
          .albumName
            color $color-text
            font-size $font-size-medium
            margin-bottom 10px
          .author
            color $color-text-ll
            font-size $font-size-small
            margin-bottom 10px
          .publicTime
            font-size $font-size-small
</style>

<template>
  <div class="recommend">
    <scroll :click="true" class="scroll">
      <div class="scroll-wrapper">
        <slider :sliderList="sliderList"></slider>
        <div class="albumRecommend">
          <h1 class="title">新碟首发</h1>
          <div class="albumItem" v-for="item in albumList" :key="item.album_mid" @click="_selectAlbum(item.album_mid)">
            <div class="img">
              <img v-lazy="item.imageUrl" alt="" height="60" width="60">
            </div>
            <div class="desc">
              <h2 class="albumName">{{item.album_name}}</h2>
              <span class="author">{{item.singers}}</span>
              <span class="publicTime">{{item.public_time}}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { getSliderList, getAlbumList } from 'api/recommend'
import { mapMutations } from 'vuex'
export default {
  components: {
    Slider,
    Scroll
  },
  data () {
    return {
      sliderList: [],
      albumList: []
    }
  },
  created () {
    this._getSliderList()
    this._getAlbumList()
  },
  methods: {
    ...mapMutations([
      'selectAlbum'
    ]),
    _selectAlbum (id) {
      this.selectAlbum(id)
    },
    _getSliderList () {
      getSliderList().then(res => {
        if (res.code === 0 && res.data.slider.length !== 0) {
          this.sliderList = res.data.slider
        }
      })
    },
    _getAlbumList () {
      getAlbumList().then(res => {
        // console.log(res.albumlib.data.list)
        res.albumlib.data.list.forEach(item => {
          let tempObj = {}
          tempObj.album_mid = item.album_mid
          tempObj.album_name = item.album_name
          tempObj.public_time = item.public_time
          tempObj.imageUrl = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + item.album_mid + '.jpg?max_age=2592000'
          let singerName = []
          item.singers.forEach(singer => {
            singerName.push(singer.singer_name)
          })
          tempObj.singers = singerName.join('/')
          this.albumList.push(tempObj)
        })
        // console.log(this.albumList)
        // https://y.gtimg.cn/music/photo_new/T002R300x300M000002O4q192lEA83.jpg?max_age=2592000
      }).catch(e => console.log(e))
    }
  }
}
</script>
