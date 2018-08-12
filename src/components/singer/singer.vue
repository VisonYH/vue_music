<style lang="stylus" scoped>
@import '~common/stylus/variable'
.singer
  position fixed
  top 88px
  left 0
  right 0
  bottom 0
  overflow hidden
  .currCate
    position absolute
    top 0
    left 0
    padding 0 20px
    width 100%
    height 30px
    background $color-highlight-background
    line-height 30px
    color $color-text-l
    font-size $font-size-small
  .scroll-wrapper
    .singer-category
      .title
        padding 0 20px
        width 100%
        height 30px
        background $color-highlight-background
        line-height 30px
        color $color-text-l
        font-size $font-size-small
      .singer-item
        padding 10px 20px
        img
          display inline-block
          border-radius 50%
          vertical-align middle
        .singer-name
          display inline-block
          margin-left 20px
          color $color-text-l
          font-size $font-size-medium
  .shortcut
    position absolute
    right 0px
    top 50%
    padding 20px 0
    transform translate3d(0, -50%, 0)
    color $color-text-l
    width 20px
    text-align center
    background $color-background-d
    border-radius 10px
    font-size $font-size-small
    z-index 30
    .shortcut-item
      height 18px
      line-height 18px
      &.active
        color $color-theme
</style>

<template>
  <div class="singer">
    <scroll @scroll="scroll" :probe-type="probeType" :scrollTo="scrollToHeight" :click="true">
      <div class="scroll-wrapper" ref="scrollWrapper">
        <div class="singer-category" v-for="category in singerList" :key="category.title">
          <h1 class="title">{{category.title}}</h1>
          <div class="singer-item" v-for="singer in category.items" :key="singer.id" @click="_selectSinger(singer.id)">
            <img v-lazy="singer.avatar" width="50" height="50" alt="歌手头像">
            <span class="singer-name">{{singer.name}}</span>
          </div>
        </div>
      </div>
      <h1 class="currCate title" ref="titleFixed">
        {{currCate}}
      </h1>
      <ul class="shortcut">
        <li class="shortcut-item" v-for="(item, index) in sortedFirstIndex" :key="item" @click="scrollTo(index)" :class="{'active': currCate === item}">
          {{item.substring(0, 1)}}
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'
const HOT_SINGER_LENGTH = 10
export default {
  components: {
    Scroll
  },
  data () {
    return {
      singerList: [],
      sortedFirstIndex: [],
      cateHeightArr: [0],
      currCate: '热门歌手',
      probeType: 3,
      scrollToHeight: 0
    }
  },
  methods: {
    ...mapMutations({
      'selectSinger': 'SELECTE_SINGER'
    }),
    _selectSinger (id) {
      this.selectSinger(id)
      this.$router.push(`/singer/${id}`)
    },
    scrollTo (index) {
      this.scrollToHeight = this.cateHeightArr[index]
      this.currCate = this.sortedFirstIndex[index]
    },
    scroll (y) {
      let i = 0
      if (y < 0) this.currCate = ''
      while (y > this.cateHeightArr[i] - 30) {
        i++
      }
      if (y < this.cateHeightArr[i - 1]) {
        this.$refs.titleFixed.style.transform = `translate3d(0, ${-30 - y + this.cateHeightArr[i - 1]}px, 0)`
      } else {
        this.$refs.titleFixed.style.transform = 'translate3d(0, 0, 0)'
        this.currCate = this.sortedFirstIndex[i - 1]
      }
    }
  },
  created () {
    getSingerList().then(res => {
      if (res.code === ERR_OK) {
        let tempObj = {}
        res.data.list.forEach(item => {
          if (!(/[a-zA-Z]/.test(item.Findex))) {
            return
          }
          if (!tempObj[item.Findex]) {
            tempObj[item.Findex] = []
          }
          tempObj[item.Findex].push({
            id: item.Fsinger_mid,
            avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000',
            name: item.Fsinger_name
          })
        })
        this.sortedFirstIndex = Object.keys(tempObj)
        this.sortedFirstIndex.sort()
        this.sortedFirstIndex.forEach(item => {
          this.singerList.push({
            title: item,
            items: tempObj[item]
          })
        })
        this.sortedFirstIndex.unshift('热门歌手')
        this.singerList.unshift({
          title: '热门歌手',
          items: res.data.list.slice(0, HOT_SINGER_LENGTH).map(item => {
            return {
              id: item.Fsinger_mid,
              avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000',
              name: item.Fsinger_name
            }
          })
        })
        this.$nextTick(() => {
          let childrenArr = this.$refs.scrollWrapper.children
          for (let i = 0; i < childrenArr.length; i++) {
            this.cateHeightArr.push(this.cateHeightArr[i] + childrenArr[i].clientHeight)
          }
        })
      }
    })
  }
}
</script>
