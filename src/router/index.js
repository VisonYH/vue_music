import Vue from 'vue'
import Router from 'vue-router'
import Singer from 'components/singer/singer'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Rank from 'components/rank/rank'
import AlbumDetail from 'components/AlbumDetail/AlbumDetail'
import TopList from 'components/top-list/top-list'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/recommend/album/:id',
      component: AlbumDetail
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
