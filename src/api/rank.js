import jsonp from 'common/js/jsonp'
import { commonUrlParams, opts } from './config'

export const getRankList = function () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  let params = Object.assign({}, commonUrlParams, {
    g_tk: 247181200,
    jsonpCallback: 'MusicJsonCallback',
    callback: 'MusicJsonCallback',
    format: 'jsonp',
    platform: 'h5',
    needNewCode: 1,
    _: 1533457521385
  })
  let opt = Object.assign({}, ...opts, {name: 'MusicJsonCallback'})
  return jsonp(url, params, opt)
}
