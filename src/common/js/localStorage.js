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
export const getSearchList = function () {
  let searchStr = localStorage.getItem('searchList')
  return JSON.parse(searchStr) || []
}
export const setSearchList = function (curr, type) {
  let searchList = getSearchList()
  let index = searchList.indexOf(curr)
  switch (type) {
    case 0:
      if (index < 0) {
        searchList.unshift(curr)
      } else {
        [searchList[0], searchList[index]] = [searchList[index], searchList[0]]
      }
      break
    case 1:
      searchList.splice(index, 1)
      break
    case 2:
      searchList = []
      break
  }
  localStorage.setItem('searchList', JSON.stringify(searchList))
}
