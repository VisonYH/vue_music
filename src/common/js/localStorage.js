export const getHistory = function () {
  let hisStr = localStorage.getItem('historyList')
  return JSON.parse(hisStr) || {}
}
export const setHistory = function (curr) {
  localStorage.setItem('historyList', JSON.stringify(curr))
}
export const getFavorite = function () {
  let favStr = localStorage.getItem('favoriteList')
  return JSON.parse(favStr) || {}
}
export const setFavorite = function (curr) {
  localStorage.setItem('favoriteList', JSON.stringify(curr))
}
