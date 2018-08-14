import Vue from 'vue'
import Router from 'vue-router'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Rank from 'components/rank/rank'
import AlbumDetail from 'components/AlbumDetail/AlbumDetail'
import TopList from 'components/top-list/top-list'
import User from 'components/user/user'
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
      component: Recommend,
      children: [{
        path: ':id',
        component: AlbumDetail
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList,
          props: true
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/user',
      component: User
    }
  ]
})
