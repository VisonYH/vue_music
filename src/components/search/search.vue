<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.search
  display flex
  flex-direction column
  position absolute
  left 0
  top 88px
  right 0
  bottom 0
  overflow hidden
  .search-wrapper
    position relative
    flex 1
    padding 0 20px
    box-sizing border-box
    margin-top 20px
    overflow hidden
    .search-history
      margin-top 20px
      .head
        position relative
        height 25px
        line-height 25px
        font-size $font-size-medium-x
        color $color-text-l
        margin-bottom 10px
        .icon
          float right
          line-height 25px
          color $color-text-d
          font-size $font-size-small
      .search-list
        position relative
        height 25px
        line-height 25px
        font-size $font-size-medium-x
        color $color-text-l
        .name
          font-size $font-size-medium
        .icon
          float right
          line-height 25px
          color $color-text-d
          font-size $font-size-small
  .input
    width 90%
    margin 10px auto 0 auto
    flex 0 0 40px
  .songlist-wrapper
    position relative
    flex 1
    overflow hidden
  .noResult-wrapper
    flex 1
</style>

<template>
  <div class="search" ref="search">
    <input-control ref="inputControl" class="input" @inputChange="inputChange"></input-control>
    <scroll class="search-wrapper" :click="true" ref="searchScroll"  v-show="currentShow === 0">
      <div>
        <search-hint class="search-hint" :list="hotList"  @selectSearchHint="selectSearchHint"></search-hint>
        <div class="search-history">
          <div class="head">
            <span class="title">搜索历史</span>
            <i class="icon icon-clear" @click="clearHis"></i>
          </div>
          <div class="search-list" v-for="his in searchHis" v-bind:key="his" @click="selectHis(his)">
            <span class="name">{{his}}</span>
            <i class="icon icon-delete" @click.stop="deleteHis(his)"></i>
          </div>
        </div>
      </div>
    </scroll>
    <scroll class="songlist-wrapper" :click="true" ref="songlistScroll" v-show="currentShow === 1">
      <search-list @selectSinger="selectSinger" @selectItem="selectItem" :songList="songList" :singer="singer"></search-list>
    </scroll>
    <no-result class="noResult-wrapper" v-show="currentShow === 2"></no-result>
  </div>
</template>

<script>
import InputControl from 'base/input-control/input-control'
import { getSeachData, getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Song from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import SearchList from 'base/search-list/search-list'
import NoResult from 'base/no-result/no-result'
import SearchHint from 'base/search-hint/search-hint'
import { mapActions, mapGetters } from 'vuex'
import { getSearchList, setSearchList } from 'common/js/localStorage'

export default {
  data () {
    return {
      singer: {},
      songList: [],
      hotList: [],
      currentShow: 0, // 0代表当前展示hotkey，1代表展示searchlist，2代表no-result
      searchHis: []
    }
  },
  components: {
    InputControl,
    Scroll,
    SearchList,
    NoResult,
    SearchHint
  },
  computed: {
    ...mapGetters([
      'playing'
    ])
  },
  created () {
    getHotKey().then(res => {
      if (res.code === ERR_OK) {
        this.hotList = res.data.hotkey.slice(0, 10)
      }
    })
    this.searchHis = getSearchList()
  },
  methods: {
    deleteHis (val) {
      setSearchList(val, 1)
      this.searchHis = getSearchList()
      this.$refs.searchScroll.refresh()
    },
    clearHis () {
      setSearchList('xxx', 2)
      this.searchHis = getSearchList()
      this.$refs.searchScroll.refresh()
    },
    selectItem (item) {
      this.selectSong({list: [item], index: 0})
      setSearchList(this.$refs.inputControl.keyWords, 0)
      this.searchHis = getSearchList()
      this.$refs.searchScroll.refresh()
    },
    selectSinger (mid) {
      setSearchList(this.$refs.inputControl.keyWords, 0)
      this.searchHis = getSearchList()
      this.$refs.searchScroll.refresh()
      this.$router.push('/singer/' + mid)
    },
    ...mapActions([
      'selectSong'
    ]),
    inputChange (keyWords) {
      this.songList = []
      this.singer = {}
      if (keyWords) {
        getSeachData(keyWords).then(res => {
          if (res.data.code === ERR_OK) {
            this.singer = res.data.data.zhida
            res.data.data.song.list.forEach(item => {
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
              this.songList.push(new Song(mid, name, singer, desc, albumId, id, duration))
            })
            if (res.data.data.song.list.length === 0 && this.singer.type === 0) {
              this.currentShow = 2
            } else {
              this.currentShow = 1
            }
          }
        })
      } else {
        this.currentShow = 0
      }
    },
    selectSearchHint (val) {
      this.$refs.inputControl.keyWords = val
    },
    selectHis (val) {
      this.$refs.inputControl.keyWords = val
    }
  },
  watch: {
    'playing' (newV) {
      if (newV) {
        this.$refs.search.style.bottom = '60px'
        this.$refs.songlistScroll.refresh()
      }
    },
    'currentShow' (newV) {
      if (newV === 0) {
        this.$nextTick(() => {
          this.$refs.searchScroll.refresh()
        })
      }
    }
  }
}
</script>
