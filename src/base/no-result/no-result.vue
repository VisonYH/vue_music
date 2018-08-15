<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.no-result
  .wrapper
    position absolute
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)
    text-align center
    .img
      margin 0 auto
      width 80px
      height 80px
      bg-image('./no-result')
      background-size 100%
    .text
      margin-top 20px
      color $color-text-l
      font-size $font-size-medium
</style>

<template>
  <div class="no-result">
    <div class="wrapper">
      <div class="img"></div>
      <p class="text">抱歉，暂无搜索结果</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>
