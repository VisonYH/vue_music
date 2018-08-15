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
    <scroll :click="true" class="scroll" ref="scroll">
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
import { getSliderList, getAlbumList, getAlbumSong } from 'api/recommend'
import { mapMutations, mapActions } from 'vuex'
import { ERR_OK } from 'api/config'
import Song from 'common/js/song'
export default {
  components: {
    Slider,
    Scroll
  },
  data () {
    return {
      sliderList: [],
      albumList: [],
      albumSong: []
    }
  },
  created () {
    this._getSliderList()
    this._getAlbumList()
  },
  activated () {
    this.$refs.scroll.refresh()
  },
  methods: {
    ...mapMutations([
    ]),
    ...mapActions([
      'selectSong'
    ]),
    _selectAlbum (mid) {
      let _this = this
      getAlbumSong(mid).then(res => {
        if (res.code === ERR_OK) {
          _this.albumSong = []
          res.data.list.forEach(item => {
            let mid = item.songmid
            let id = item.songid
            let duration = item.interval
            let name = item.songname
            let singer = []
            let desc = item.albumname
            let albumId = item.albummid
            item.singer.forEach(item => {
              singer.push(item.name)
            })
            singer = singer.join('/')
            _this.albumSong.push(new Song(mid, name, singer, desc, albumId, id, duration))
          })
          this.selectSong({list: _this.albumSong, index: 0})
        }
      })
    },
    _getSliderList () {
      getSliderList().then(res => {
        if (res.code === ERR_OK && res.data.slider.length !== 0) {
          this.sliderList = res.data.slider
        }
      })
    },
    _getAlbumList () {
      getAlbumList().then(res => {
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
      }).catch(e => console.log(e))
    }
  }
}
</script>
