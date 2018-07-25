import jsonp from 'common/js/jsonp'
import { commonUrlParams, opts } from './config.js'

export const getSliderList = function () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let params = Object.assign({}, commonUrlParams, {
    platform: 'h5',
    needNewCode: 1,
    _: '1532266219692'
  })
  return jsonp(url, params, opts)
}

export const getAlbumList = function () {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  let params = Object.assign({}, commonUrlParams, {
    callback: 'getUCGI07098409694582686',
    g_tk: '2007379508',
    jsonpCallback: 'getUCGI07098409694582686',
    loginUin: '2065610194',
    hostUin: '0',
    platform: 'yqq',
    inCharset: 'utf8',
    needNewCode: 0,
    data: {
      'albumlib': {
        'method': 'get_album_by_tags',
        'param': {
          'area': 7,
          'company': -1,
          'genre': -1,
          'type': -1,
          'year': -1,
          'sort': 2,
          'get_tags': 1,
          'sin': 0,
          'num': 20,
          'click_albumid': 0
        },
        'module': 'music.web_album_library'
      }
    }
  })
  let opt = Object.assign({}, ...opts, {name: 'getUCGI07098409694582686'})
  return jsonp(url, params, opt)
}
