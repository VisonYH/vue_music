<style lang="stylus" scoped>
@import '~common/stylus/variable'
.top-list
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 100
  background $color-background
</style>

<template>
  <div class="top-list">
    <music-list :songList="songList" :title="title" :picture="picture"></music-list>
  </div>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'
import Song from 'common/js/song'
export default {
  data () {
    return {
      songList: [],
      title: '',
      picture: ''
    }
  },
  components: {
    MusicList
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  created () {
    getTopList(this.id).then(res => {
      console.log(res)
      if (res.code === ERR_OK) {
        res.songlist.forEach(item => {
          item = item.data
          let name = item.songname
          let mid = item.songmid
          let id = item.songid
          let duration = item.interval
          let albumId = item.albummid
          let singerName = []
          item.singer.forEach(singer => {
            singerName.push(singer.name)
          })
          let singer = singerName.join('/')
          let desc = item.albumname
          this.songList.push(new Song(mid, name, singer, desc, albumId, id, duration))
        })
        this.title = res.topinfo.ListName
        this.picture = res.topinfo.pic_album
      }
    }).catch(e => console.log(e))
  }
}
</script>
