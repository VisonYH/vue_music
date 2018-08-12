import Song from 'common/js/song'
export default function (arr) {
  let arrStr = JSON.stringify(arr)
  let newArr = JSON.parse(arrStr)
  let i = newArr.length
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  // console.log(newArr)
  // newArr.map(item => )
  newArr = newArr.map(item => {
    // mid = '', name = '', singer = '', desc = '', albumId = '', id = '', duration
    return new Song(item.mid, item.name, item.singer, item.desc, item.albumId, item.id, item.duration)
  })
  // newArr[0].getPlayUrl().then(res => console.log(res))
  return newArr
}
