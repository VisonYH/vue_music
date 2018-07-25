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
  let urlToAppend = ''
  for (let item in params) {
    let value = (params[item] instanceof Object) ? JSON.stringify(params[item]) : params[item]
    urlToAppend += '&' + item + '=' + value
  }
  return url + encodeURI(urlToAppend)
}
export default jsonp
