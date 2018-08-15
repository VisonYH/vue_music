<style lang="stylus" scoped>
@import '~common/stylus/variable'
.search-hint
  .title
    font-size $font-size-medium-x
    color $color-text-l
    margin-bottom 10px
  .item
    display inline-block
    padding 5px
    background $color-highlight-background
    margin 5px 12px 5px 0
    font-size $font-size-small
    color $color-text-l
    border-radius 3px
</style>

<template>
  <div class="search-hint">
    <h1 class="title">
      热门搜索
    </h1>
    <div class="item" v-for="listItem in list" :key="listItem.k" v-html="listItem.k" @click="selectItem(listItem.k)"></div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    selectItem (val) {
      this.$emit('selectSearchHint', val)
    }
  }
}
</script>
