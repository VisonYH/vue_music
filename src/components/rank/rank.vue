<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.rank
  position absolute
  top 88px
  left 0
  right: 0;
  bottom: 0;
  overflow hidden
  .scroll-wrapper
    overflow hidden
    .item
      display flex
      padding 20px 20px 0
      // width 100%
      // box-sizing border-box
      img
        flex 0 0 100px
      .desc
        display flex
        flex-direction column
        justify-content center
        flex 1
        padding-left 20px
        background $color-highlight-background
        color $color-text-d
        font-size $font-size-small-s
        no-wrap()
        .song-item
          line-height 28px
          overflow hidden
          no-wrap()
</style>

<template>
  <div class="rank">
    <scroll :click="true">
      <div class="scroll-wrapper">
        <div class="item" v-for="item in rankList" :key="item.id" @click="selectRank(item.id)">
          <img v-lazy="item.picUrl" alt="" height="100" width="100">
          <div class="desc">
            <div class="song-item" v-for="(song, index) in item.songList" :key="song.songname">
              <span class="order">{{index + 1}}</span>
              <span class="singer">{{song.singername}}</span>
              <span class="name">{{song.songname}}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRankList } from 'api/rank'
import Scroll from 'base/scroll/scroll'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      rankList: []
    }
  },
  components: {
    Scroll
  },
  created () {
    getRankList().then(res => {
      if (res['code'] !== undefined && res.code === ERR_OK) {
        this.rankList = res.data.topList
      }
    })
  },
  methods: {
    selectRank (id) {
      this.$router.push(`/rank/${id}`)
      console.log(this.$router)
    }
  }
}
</script>
