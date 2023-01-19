// ----- TextAreas
const textAreaInput = document.querySelector('.textArea_inPut')
const textAreaPreviewOrigin = document.querySelector('.textArea_preview_origin')
const textAreaPreviewWithoutTS = document.querySelector('.textArea_preview_wt_ts')
const textAreaPreviewSpaces = document.querySelector('.textArea_preview_dots')

const previeBox1 = document.querySelector('.previe_box_1')
const previeBox2 = document.querySelector('.previe_box_2')
const previeBox3 = document.querySelector('.previe_box_3')


// ----- Buttons
const btn_Fix = document.querySelector('.btn_fix')
const btn_Brakes = document.querySelector('.btn_brakes')
const btn_Copy = document.querySelector('.btn_copy')
const btn_Clear = document.querySelector('.btn_clear')
const btn_Past = document.querySelector('.btn_past')
const btn_Chain = document.querySelector('.btn_chain')

const previewBoxes = document.querySelectorAll('.previe_box')

const contentFirstWord = document.querySelector('.heading_center')





textAreaInput.addEventListener('input', function () {
  textAreaPreviewOrigin.value = textAreaInput.value
})


textAreaInput.addEventListener('paste', function () {
  console.log('paste');
  textAreaInput.scrollTo(0, 0)
})




// ----- FUNCTIONS


const removeBrakesFromWord = word => {

  const iFirst = word.indexOf('\n')
  const iLast = word.lastIndexOf('\n')

  const wordArr = word.split('')

  wordArr.splice(iFirst, iLast - iFirst + 1, ' ')

  return wordArr.join('')
}


const getFirstFiveWords = text => {
  const arr1 = text.split(' ')
  const newArr = arr1.slice(0, 6)
  const finalString = `${newArr.join(' ')}...`
  return finalString
}

// getFirstFiveWords(['1', '2', '3', '4', '5', '6', '7', '8', '9'])


const findAndRemoreTimestampsUI = text => {

  const textArr = text.split(' ')

  for (const [i, word] of textArr.entries()) {
    if (word.includes('\n')) {
      const fixWord = removeBrakesFromWord(word)
      textArr.splice(i, 1, fixWord)
    }
  }

  return textArr.join(' ')

}


const addBrakesAfterDots = text => {

  // const dotsNumber = Number(inputDotsNumber.value)

  const src = text.split(' ')

  let acc = 0

  for (const [i, el] of src.entries()) {

    if (el[el.length - 1] === '.') {
      acc++
    }

    if (el[el.length - 1] === '.' && acc === 4) {
      src.splice(i + 1, 0, '\n\n');
      acc = 0
    }

  }

  return src.join(' ')

}


function copyToClipboard(id) {
  const str = document.querySelector(id).value

  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}




// ----- EVENTS HANDLERS

let origintext = ''
let textWithoutTS = ''
let textWithDotsSpaces = ''
let textWithCustomSpaces = ''



btn_Fix.addEventListener('click', function () {

  origintext = textAreaInput.value
  textWithoutTS = findAndRemoreTimestampsUI(textAreaInput.value)
  textAreaPreviewWithoutTS.value = textWithoutTS
  contentFirstWord.textContent = getFirstFiveWords(findAndRemoreTimestampsUI(textAreaInput.value))

  textAreaInput.value = textWithoutTS
  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }
  previeBox2.classList.add('preview_active')

  document.querySelector('.previe_box_2').classList.remove('display_none')
  document.querySelector('.subheading2').classList.remove('display_none')


  textAreaInput.scrollTo(0, 0)
})


btn_Brakes.addEventListener('click', function () {

  textWithDotsSpaces = addBrakesAfterDots(textWithoutTS)

  textAreaPreviewSpaces.value = textWithDotsSpaces

  textAreaInput.value = textWithDotsSpaces
  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  previeBox3.classList.add('preview_active')


  document.querySelector('.previe_box_3').classList.remove('display_none')
  document.querySelector('.subheading3').classList.remove('display_none')

  textAreaInput.scrollTo(0, 0)

})


btn_Copy.addEventListener('click', function () {
  copyToClipboard('.textArea_inPut')
})


btn_Clear.addEventListener('click', function () {

  textAreaInput.value = ''
  textAreaPreviewOrigin.value = ''
  textAreaPreviewWithoutTS.value = ''
  textAreaPreviewSpaces.value = ''
  origintext = ''
  textWithoutTS = ''
  textWithDotsSpaces = ''
  textWithCustomSpaces = ''
  contentFirstWord.textContent = 'Enter any content...'

  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  previeBox1.classList.add('preview_active')

  document.querySelector('.previe_box_3').classList.add('display_none')
  document.querySelector('.subheading3').classList.add('display_none')
  document.querySelector('.previe_box_2').classList.add('display_none')
  document.querySelector('.subheading2').classList.add('display_none')

})


btn_Past.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText()
    textAreaInput.value += text;
    console.log('Text pasted.');
    textAreaPreviewOrigin.value = textAreaInput.value

  } catch (error) {
    console.log('Failed to read clipboard');
  }

  textAreaInput.scrollTo(0, 0)

  contentFirstWord.textContent = getFirstFiveWords(findAndRemoreTimestampsUI(textAreaInput.value))
});


btn_Chain.addEventListener('click', async function () {

  // 1. Clear

  textAreaInput.value = ''
  textAreaPreviewOrigin.value = ''
  textAreaPreviewWithoutTS.value = ''
  textAreaPreviewSpaces.value = ''
  origintext = ''
  textWithoutTS = ''
  textWithDotsSpaces = ''
  textWithCustomSpaces = ''
  contentFirstWord.textContent = 'Enter any content...'

  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  previeBox1.classList.add('preview_active')

  document.querySelector('.previe_box_3').classList.add('display_none')
  document.querySelector('.subheading3').classList.add('display_none')
  document.querySelector('.previe_box_2').classList.add('display_none')
  document.querySelector('.subheading2').classList.add('display_none')


  // 2. Past

  try {
    const text = await navigator.clipboard.readText()
    textAreaInput.value += text;
    console.log('Text pasted.');
    textAreaPreviewOrigin.value = textAreaInput.value

  } catch (error) {
    console.log('Failed to read clipboard');
  }

  textAreaInput.scrollTo(0, 0)

  contentFirstWord.textContent = getFirstFiveWords(findAndRemoreTimestampsUI(textAreaInput.value))

  // 3. Fix TimeStamps

  origintext = textAreaInput.value
  textWithoutTS = findAndRemoreTimestampsUI(textAreaInput.value)
  textAreaPreviewWithoutTS.value = textWithoutTS
  contentFirstWord.textContent = getFirstFiveWords(findAndRemoreTimestampsUI(textAreaInput.value))

  textAreaInput.value = textWithoutTS
  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }
  previeBox2.classList.add('preview_active')

  document.querySelector('.previe_box_2').classList.remove('display_none')
  document.querySelector('.subheading2').classList.remove('display_none')


  // 4. Add brakes

  textWithDotsSpaces = addBrakesAfterDots(textWithoutTS)

  textAreaPreviewSpaces.value = textWithDotsSpaces

  textAreaInput.value = textWithDotsSpaces
  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  previeBox3.classList.add('preview_active')


  document.querySelector('.previe_box_3').classList.remove('display_none')
  document.querySelector('.subheading3').classList.remove('display_none')

  textAreaInput.scrollTo(0, 0)


  // 5. Copy final text

  copyToClipboard('.textArea_inPut')





})







previeBox1.addEventListener('click', function () {
  textAreaInput.value = origintext
  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  previeBox1.classList.add('preview_active')
})


previeBox2.addEventListener('click', function () {

  textAreaInput.value = textWithoutTS

  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  previeBox2.classList.add('preview_active')

})


previeBox3.addEventListener('click', function () {
  textAreaInput.value = textWithDotsSpaces
  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  previeBox3.classList.add('preview_active')
})