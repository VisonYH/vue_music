import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'

export const getSliderList = function () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let params = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    _: '1532266219692'
  })
  return jsonp(url, params, options)
}
