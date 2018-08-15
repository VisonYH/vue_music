<style lang="stylus" scoped>
@import '~common/stylus/variable'
.input-wrapper
  width 100%
  height 40px
  position relative
  .icon
    color #666
    height 40px
    line-height 40px
  .icon-search
    position: absolute
    left 10px
    font-size $font-size-large-x
  .icon-dismiss
    position absolute
    right 10px
    top 0
    font-size $font-size-medium
    color $color-background
  .input
    width 100%
    height 40px
    background $color-highlight-background
    border-radius 5px
    outline none
    box-sizing border-box
    padding-left 35px
    caret-color $color-text
    color $color-text-d
    font-size $font-size-medium
</style>

<template>
  <div class="input-wrapper">
    <i class="icon icon-search"></i>
    <input type="text" class="input" v-model="keyWords" placeholder="请输入歌手或歌曲名" ref="input"/>
    <i class="icon icon-dismiss" v-if="keyWords" @click="clear"></i>
  </div>
</template>

<script>
import { debunce } from 'common/js/debunce'
export default {
  data () {
    return {
      keyWords: ''
    }
  },
  methods: {
    changeInput (value) {
      this.$emit('inputChange', value)
    },
    clear () {
      this.keyWords = ''
    }
  },
  created () {
    let debuncedfn = debunce(this.changeInput, 200)
    this.$watch('keyWords', (newV) => {
      debuncedfn(newV)
    })
  }
}
</script>
