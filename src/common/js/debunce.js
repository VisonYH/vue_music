/**
 * Created by VisonYH on 2018/8/14.
 */
export const debunce = function (fn, time) {
  var timeout
  return function () {
    if (timeout !== undefined) {
      window.clearTimeout(timeout)
    }
    timeout = window.setTimeout(() => {
      fn(...arguments)
    }, time)
  }
}
