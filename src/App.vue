<template>
  <div id="app">
    <m-header />
    <m-tab />
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import MTab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  name: 'App',
  components: {
    MHeader,
    MTab,
    Player
  }
}
</script>

<style>
</style>
