export default function (arr) {
  let newArr = arr.slice()
  let i = newArr.length
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}
