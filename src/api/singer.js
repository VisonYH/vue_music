import jsonp from 'common/js/jsonp'
import { commonUrlParams, opts } from './config.js'

export const getSingerList = function () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let params = Object.assign({}, commonUrlParams, {
    jsonpCallback: 'getSingerList',
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1928093487
  })
  let opt = Object.assign({}, ...opts, {name: 'getSingerList'})
  return jsonp(url, params, opt)
}
