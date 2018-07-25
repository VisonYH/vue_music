import jsonp from 'common/js/jsonp'
import { commonUrlParams, opts } from './config.js'

export const getSingerList = function () {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  let params = Object.assign({}, commonUrlParams, {
    callback: 'getUCGI9452956218362532',
    g_tk: '364648807',
    jsonpCallback: 'getUCGI9452956218362532',
    loginUin: '2065610194',
    hostUin: 0,
    format: jsonp,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: {
      'comm': {
        'ct': 24,
        'cv': 10000
      },
      'singerList': {
        'module': 'Music.SingerListServer',
        'method': 'get_singer_list',
        'param': {
          'area': -100,
          'sex': -100,
          'genre': -100,
          'index': -100,
          'sin': 0,
          'cur_page': 1
        }
      }
    }
  })
  let opt = Object.assign({}, ...opts, {name: 'getUCGI9452956218362532'})
  return jsonp(url, params, opt)
}
