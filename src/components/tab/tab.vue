<template>
  <div class="tab">
    <router-link to="/recommend" tag="div"><span>推荐</span></router-link>
    <router-link to="/singer" tag="div"><span>歌手</span></router-link>
    <router-link to="/rank" tag="div"><span>排行</span></router-link>
    <router-link to="/search" tag="div"><span>搜索</span></router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.tab
  display flex
  height 44px
  text-align center
  font-size $font-size-medium
  div
    flex 1
    span
      line-height 44px
      padding-bottom 5px
    &.router-link-active
      span
        border-bottom 2px solid $color-theme
        color $color-theme
</style>
