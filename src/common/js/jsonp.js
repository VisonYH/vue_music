import JSONP from 'jsonp'

const jsonp = (url, params, opt) => {
  url = formatParams(url, params)
  return new Promise((resolve, reject) => {
    JSONP(url, opt, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function formatParams (url, params) {
  url = url.indexOf('?') !== -1 ? url : url + '?'
  for (let item in params) {
    url += '&' + item + '=' + params[item]
  }
  return url
}
export default jsonp
