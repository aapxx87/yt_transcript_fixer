const btnGoTest = document.querySelector('.btn_go_test')
const btnGoTimeStamps = document.querySelector('.btn_go_timestamp')

const textAreaOutput_TS = document.querySelector('.textArea_ts_output')
const textAreaInput_TimeStamps = document.querySelector('.textArea_input_ts')
const textAreaFinal = document.querySelector('.textArea_ts_final')



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


// убираем лишний пробел в начале параграфов
const trimStartParagraph_2 = text => {

  // разюиваем текст по параграфам. Один параграф - 1 строка string элемент в массиве. В параграфах будет первый симвоил - пробел, который мы можем уже легко убрать методом trimStart
  const paragraphArr = text.split('\n')

  // массив в который засунем исправленные параграфы, то есть уже без лишнего пробела
  const fixedParagraphArr = []

  for (const paragraph of paragraphArr) {
    // у каждого параграфа, то есть это строка, убираем проблел в начале и суем его в массив
    fixedParagraphArr.push(paragraph.trimStart())
  }

  // сращиваем массив с пофикшеными параграфами в текст по знаку \n, то есть сращиваем их при помощи переноса на новую строку
  return fixedParagraphArr.join('\n')

}



const addBrakesAfterDots_2 = text => {

  const indexFirstparagraphWord = []

  // const dotsAmount = Number(amountOfDots.value)

  const dotsAmount = 6

  const src = text.split(' ')

  let acc = 0

  for (const [i, el] of src.entries()) {

    if (el[el.length - 1] === '.') {
      acc++
    }

    if (el[el.length - 1] === '.' && acc === dotsAmount) {
      src.splice(i + 1, 0, '\n\n');
      indexFirstparagraphWord.push(i + 2)
      acc = 0
    }

  }

  return trimStartParagraph_2(src.join(' '))

}





//  |----- TESTE DATA ------>

const ts0 = '0:00'
const ts1 = '04:53'
const ts2 = '07:13'
const ts3 = '09:26'
const ts4 = '09:59'
const ts5 = '13:37'

// const ts6 = '1:12:37'
// const ts6Time = dateParse(stringToDate(ts6))
// console.log(ts6Time);

const ts0Time = dateParse(stringToDate(ts0))
const ts1Time = dateParse(stringToDate(ts1))
const ts2Time = dateParse(stringToDate(ts2))
const ts3Time = dateParse(stringToDate(ts3))
const ts4Time = dateParse(stringToDate(ts4))
const ts5Time = dateParse(stringToDate(ts5))

const tsArr = [ts0Time, ts1Time, ts2Time, ts3Time, ts4Time, ts5Time]

//  >----- TESTE DATA ------|




// -------- EVENTHANDLERS


btnGoTest.addEventListener('click', function () {

  const splitTS = split_TextToArrByBrakes(textAreaInput_TimeStamps.value)

  const separateTSandNames = separate_TSandNamesArr(splitTS)



  let startIndex = 0


  const fixedTextArr = []

  for (const [i, el] of separateTSandNames.entries()) {

    // console.log(el[0], dateParse(stringToDate(el[0])));

    const originTextArr = findWordsWithTimeStamp(textToArray(textAreaOutput_TS.value))

    const dotsArr = findIndexAllDots(originTextArr)

    const textArr = textToArray(textAreaOutput_TS.value)

    const correctTs = replaceTimeStringToDate(findWordsWithTimeStamp(textArr))

    const endIndex = findtargetTSindex(dateParse(stringToDate(separateTSandNames[i + 1][0])), saveIndexTS(correctTs))

    const dotAfterEndIndex = findFirstDotIdxAfterEnindex(endIndex, dotsArr)


    const fragment = extractTargetFragment(textArr, startIndex, dotAfterEndIndex)
    // const fragment = extractTargetFragment(textArr, manualLastIndex, dotAfterEndIndex)

    startIndex = dotAfterEndIndex + 1

    const finalFragment = []

    for (const word of fragment) {
      if (typeof word === 'string') {
        finalFragment.push(word)
      }
    }


    // console.log(addBrakesAfterDots_2(finalFragment.join(' ')))

    // console.log(separateTSandNames[i][1] + '\n\n' + addBrakesAfterDots_2(finalFragment.join(' ')));

    fixedTextArr.push('\n\n\n\n\n' + separateTSandNames[i][1] + '\n\n' + addBrakesAfterDots_2(finalFragment.join(' ')))


    // console.log(fixedTextArr.join(' '));

    textAreaFinal.value = ''
    textAreaFinal.value = fixedTextArr.join(' ')





  }

  console.log(fixedTextArr.join(' '));














  // for (let i = 0; i < tsArr.length; i++) {

  //   const originTextArr = findWordsWithTimeStamp(textToArray(textAreaOutput_TS.value))

  //   const dotsArr = findIndexAllDots(originTextArr)

  //   const textArr = textToArray(textAreaOutput_TS.value)

  //   const correctTs = replaceTimeStringToDate(findWordsWithTimeStamp(textArr))

  //   console.log(tsArr[i + 1]);

  //   const endIndex = findtargetTSindex(tsArr[i + 1], saveIndexTS(correctTs))

  //   const dotAfterEndIndex = findFirstDotIdxAfterEnindex(endIndex, dotsArr)

  //   const fragment = extractTargetFragment(textArr, startIndex, dotAfterEndIndex)

  //   startIndex = dotAfterEndIndex + 1

  //   const finalFragment = []

  //   for (const word of fragment) {
  //     if (typeof word === 'string') {
  //       finalFragment.push(word)
  //     }
  //   }

  //   console.log(finalFragment.join(' '));

  //   fixedTextArr.push(finalFragment.join(' '))

  // }

  // console.log(fixedTextArr);





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




// 1. делим исходный текст на массив с разделением по переносу строки, строки таймштамп и его название становятся единым элементом в массиве. 
const split_TextToArrByBrakes = text => {
  const splitByBrakesArr = text.split('\n')
  return splitByBrakesArr
}


// 2. создаем массив из таймштампа и названия по отдельности
const separate_TSandNamesArr = arr => {

  const newArr = []

  for (const [idx, el] of arr.entries()) {
    const indexOfSpace = el.indexOf(' ')

    const newElement = el.split('')
    const timeStamp = newElement.splice(0, indexOfSpace).join('')
    const title = newElement.splice(1).join('')

    newArr.push([timeStamp, title])


    console.log(timeStamp, title, indexOfSpace);

  }

  console.log(newArr);

  return newArr

}




btnGoTimeStamps.addEventListener('click', function () {

  const splitTS = split_TextToArrByBrakes(textAreaInput_TimeStamps.value)

  const separateTSandNames = separate_TSandNamesArr(splitTS)



})