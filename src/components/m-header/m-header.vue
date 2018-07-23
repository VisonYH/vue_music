<template>
  <div class="header">
    <div class="logo"></div>
    <h1>Chicken Music</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.header
  height 44px
  color $color-theme
  font-size 0
  text-align center
  .logo
    display inline-block
    height 32px
    width 30px
    margin-right 9px
    background-repeat no-repeat
    background-size 100%
    bg-image('logo')
    vertical-align middle
  h1
    display inline-block
    font-size $font-size-large
    line-height 44px
    vertical-align middle
</style>
