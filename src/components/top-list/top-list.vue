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
class Song {
  constructor (id, name, singer, desc) {
    this.id = id
    this.name = name
    this.singer = singer
    this.desc = desc
  }
}
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
          let name = item.data.songname
          let id = item.data.songmid
          let singerName = []
          item.data.singer.forEach(singer => {
            singerName.push(singer.name)
          })
          let singer = singerName.join('/')
          let desc = item.data.albumname
          this.songList.push(new Song(id, name, singer, desc))
        })
        this.title = res.topinfo.ListName
        this.picture = res.topinfo.pic_album
      }
    }).catch(e => console.log(e))
  },
  beforeRouteUpdate (to, from, next) {
    // console.log('update========', to.params.id)
    next()
  },
  beforeRouteEnter (to, from, next) {
    // console.log('leave========', to.params.id)
    next()
  }
}
</script>
