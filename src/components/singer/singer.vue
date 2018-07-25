<template>
  <div class="singer">
    this is singer page
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    getSingerList().then(res => {
      if (res.code === ERR_OK && res.singerList.code === ERR_OK) {
        console.log(res.singerList.data.singerlist)
      }
    })
  }
}
</script>

sty <style lang="stylus" scoped>

</style>
