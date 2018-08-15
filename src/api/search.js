/**
 * Created by VisonYH on 2018/8/14.
 */

import jsonp from 'common/js/jsonp'
import { commonUrlParams, opts } from './config.js'
import axios from 'axios'

export const getSeachData = function (keyWords) {
  let url = '/searchR/soso/fcgi-bin/search_for_qq_cp?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=' + encodeURIComponent(keyWords) + '&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5'
  return axios.get(url)
}

export const getHotKey = function () {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  let params = Object.assign({}, commonUrlParams, {
    jsonpCallback: 'hotSearchKeysmod_search',
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  let opt = Object.assign({}, ...opts, {name: 'hotSearchKeysmod_search'})
  return jsonp(url, params, opt)
}
