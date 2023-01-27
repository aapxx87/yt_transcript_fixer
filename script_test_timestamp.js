const btnGoTest = document.querySelector('.btn_go_test')



const textToArray = text => {
  const arrText = text.split(' ')
  return arrText
}



const findWordsWithTimeStamp = arr => {

  for (const [i, word] of arr.entries()) {
    if (word.includes('\n')) {
      // вытаскиваем таймштамп из строки и создаем три отдельных элемента, один из которых таймштам
      arr.splice(i, 1, ...extractTimeStampFromWord(word))
    }
  }

  return arr

}




const extractTimeStampFromWord = word => {
  const wordReplaceSpace = word.replaceAll('\n', ' ')
  const newWordArr = word.split('\n')
  return newWordArr
}




const replaceTimeStringToDate = arr => {

  for (const [i, word] of arr.entries()) {
    if (word.includes(':')) {
      const correctDate = dateParse(stringToDate(word))
      arr.splice(i, 1, correctDate)
    }
  }

  return arr

}




const stringToDate = str => {

  const timeStamp = new Date

  if (str.length <= 5) {

    const arr = str.split(':')
    timeStamp.setHours(0, Number(arr[0]), Number(arr[1]))
    return timeStamp

  } else {

    const arr = str.split(':')
    timeStamp.setHours(Number(arr[0]), Number(arr[1], Number(arr[2])))
    return timeStamp

  }

}

const dateParse = date => {
  const output = Date.parse(date)
  return output
}




// создаем массив с индексами только таймштампов, чтобы потом сравнить с ним тот таймштамп, по которому нужно ыделить фрагмент и получить индекс для дальнейшего обрезания
const saveIndexTS = arr => {

  const newArr = []

  for (const [i, word] of arr.entries()) {
    if (typeof word != 'string') {
      newArr.push([word, i])
    }
  }

  // console.log(newArr);
  return newArr

}





// проходимся по массиву с индесами всей таймштампов, чтобы найти ближайший к необходимому, получаем этот индекс
const findtargetTSindex = (targetTS, arr) => {

  const idxArr = []

  for (const [i, item] of arr.entries()) {
    idxArr.push(item[1])
    if (item[0] >= targetTS) break
  }

  const targetIndex = idxArr[idxArr.length - 2]

  return targetIndex

}






// вырезаем из исходного текста (первичный массив текста) необходимую часть
const extractTargetFragment = (textArr, startIndex, endIndex) => {
  const arr = textArr
  const outPut = arr.slice(startIndex, endIndex + 1)
  return outPut
}



// -------- FUNCTIONS FOR DOTS

const findIndexAllDots = originTextArr => {

  const dotsIndexesArr = []

  for (const [i, el] of originTextArr.entries()) {

    if (el.includes('.')) {
      dotsIndexesArr.push(i)
    }
  }

  return dotsIndexesArr

}


const findFirstDotIdxAfterEnindex = (endIndex, arrDotsIdx) => {

  const arr = []

  for (const el of arrDotsIdx) {
    arr.push(el)
    if (el >= endIndex) break
  }


  const lastEl = arr[arr.length - 1]
  // console.log(lastEl);

  return lastEl

}


//  |----- TESTE DATA ------>

const ts0 = '0:00'
const ts1 = '6:20'
const ts2 = '12:00'
const ts3 = '12:58'
const ts4 = '13:30'
// const ts5 = '10:25'

const ts0Time = dateParse(stringToDate(ts0))
const ts1Time = dateParse(stringToDate(ts1))
const ts2Time = dateParse(stringToDate(ts2))
const ts3Time = dateParse(stringToDate(ts3))
const ts4Time = dateParse(stringToDate(ts4))
// const ts5Time = dateParse(stringToDate(ts5))

const tsArr = [ts0Time, ts1Time, ts2Time, ts3Time, ts4Time]

//  >----- TESTE DATA ------|




// -------- EVENTHANDLERS


btnGoTest.addEventListener('click', function () {

  let startIndex = 0


  for (let i = 0; i < tsArr.length; i++) {

    const originTextArr = findWordsWithTimeStamp(textToArray(textAreaInput.value))

    const dotsArr = findIndexAllDots(originTextArr)
    // // console.log(dotsArr);

    const textArr = textToArray(textAreaInput.value)

    const correctTs = replaceTimeStringToDate(findWordsWithTimeStamp(textArr))

    // startIndex = findtargetTSindex(tsArr[i], saveIndexTS(correctTs))

    const endIndex = findtargetTSindex(tsArr[i + 1], saveIndexTS(correctTs))

    // console.log(endIndex);

    const dotAfterEndIndex = findFirstDotIdxAfterEnindex(endIndex, dotsArr)

    // startIndex = dotAfterEndIndex + 1


    console.log(startIndex);

    console.log(dotAfterEndIndex);

    // manualLastIndex = dotAfterEndIndex + 1


    const fragment = extractTargetFragment(textArr, startIndex, dotAfterEndIndex)
    // const fragment = extractTargetFragment(textArr, manualLastIndex, dotAfterEndIndex)

    startIndex = dotAfterEndIndex + 1

    const finalFragment = []

    for (const word of fragment) {
      if (typeof word === 'string') {
        finalFragment.push(word)
      }
    }

    console.log(finalFragment.join(' '));


  }





  // const originTextArr = findWordsWithTimeStamp(textToArray(textAreaInput.value))

  // const dotsArr = findIndexAllDots(originTextArr)
  // // // console.log(dotsArr);

  // const textArr = textToArray(textAreaInput.value)

  // const correctTs = replaceTimeStringToDate(findWordsWithTimeStamp(textArr))

  // const startIndex = findtargetTSindex(ts0Time, saveIndexTS(correctTs))

  // // console.log(startIndex);

  // const endIndex = findtargetTSindex(ts1Time, saveIndexTS(correctTs))

  // // console.log(endIndex);

  // const dotAfterEndIndex = findFirstDotIdxAfterEnindex(endIndex, dotsArr)

  // console.log(dotAfterEndIndex);

  // let manualLastIndex = dotAfterEndIndex + 1

  // // const fragment = extractTargetFragment(textArr, startIndex, dotAfterEndIndex)
  // const fragment = extractTargetFragment(textArr, manualLastIndex, dotAfterEndIndex)


  // const finalFragment = []

  // for (const word of fragment) {
  //   if (typeof word === 'string') {
  //     finalFragment.push(word)
  //   }
  // }

  // console.log(finalFragment.join(' '));




})
















