<style lang="stylus" scoped>
@import '~common/stylus/variable'
.switch
  height 40px
  font-size 0
  .item
    display inline-block
    box-sizing border-box
    width 50%
    /*padding 0 20px*/
    line-height 30px
    color $color-text-d
    background $color-background
    border 1px solid $color-highlight-background
    font-size $font-size-medium
    text-align center
    &.active
      color $color-text
      background $color-highlight-background
</style>

<template>
  <div class="switch">
    <div class="item" :class="{active: leftActive}" @click="toggle('left')">{{data[0]}}</div>
    <div class="item" :class="{active: !leftActive}" @click="toggle('right')">{{data[1]}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leftActive: true
    }
  },
  props: {
    data: {
      type: Array,
      default: () => ['左边的', '右边的']
    }
  },
  methods: {
    toggle (item) {
      if (item === 'left') {
        this.leftActive = true
        this.$emit('toggle', true)
      } else {
        this.leftActive = false
        this.$emit('toggle', false)
      }
    }
  }
}
</script>
