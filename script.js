// - TextAreas
const textAreaInput = document.querySelector('.textArea_inPut')
const textAreaPreviewOrigin = document.querySelector('.textArea_preview_origin')
const textAreaPreviewWithoutTS = document.querySelector('.textArea_preview_wt_ts')
const textAreaPreviewSpaces = document.querySelector('.textArea_preview_dots')

// --- Preview TextAreas
const previeBox1 = document.querySelector('.previe_box_1')
const previeBox2 = document.querySelector('.previe_box_2')
const previeBox3 = document.querySelector('.previe_box_3')


// - Buttons
const btn_Fix = document.querySelector('.btn_fix')
const btn_Brakes = document.querySelector('.btn_brakes')
const btn_Copy = document.querySelector('.btn_copy')
const btn_Clear = document.querySelector('.btn_clear')
const btn_Past = document.querySelector('.btn_past')
const btn_Chain = document.querySelector('.btn_chain')
const btn_Pattern_Brakes = document.querySelector('.btn_patterns_brakes')


// - Inputs
const amountOfDots = document.querySelector('.input_dots_amount')
const patternsForBrakes = document.querySelector('.input_custom_brakes')
const autoPatternsBrakes = document.querySelector('#checkbox_patterns_brakes')


const previewBoxes = document.querySelectorAll('.previe_box')

const contentFirstWord = document.querySelector('.heading_center')





textAreaInput.addEventListener('input', function () {
  textAreaPreviewOrigin.value = textAreaInput.value
})


textAreaInput.addEventListener('paste', function () {
  // console.log('paste');
  textAreaInput.scrollTo(0, 0)
})




// ----- FUNCTIONS

const find_and_remove_timestamps_and_brakes = origin_youtube_text => {

  const words_array = origin_youtube_text.split(' ')

  const words_array_without_timestamp = words_array.map(word => {

    if (word.includes('\n')) {
      const word_with_timestamp = word
      const word_without_timestamp = remove_timestamps_from_trigger_word(word_with_timestamp)
      return word_without_timestamp
    }

    return word

  })

  return words_array_without_timestamp.join(' ')

}






const remove_timestamps_from_trigger_word = word_with_timestamp => {

  const idxFirst = word_with_timestamp.indexOf('\n')
  const idxLast = word_with_timestamp.lastIndexOf('\n')

  const letters_array = word_with_timestamp.split('')

  letters_array.splice(idxFirst, idxLast - idxFirst + 1, ' ')

  return letters_array.join('')
}






const create_string_from_first_five_words = text => {
  const words_array = text.split(' ')
  const first_five_words_array = words_array.slice(0, 6)
  const first_five_words_string = `${first_five_words_array.join(' ')}...`
  return first_five_words_string
}









// убираем лишний пробел в начале параграфов
const trimStartParagraph = text => {

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





const addBrakesAfterDots = text => {

  const indexFirstparagraphWord = []

  const dotsAmount = Number(amountOfDots.value)

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

  return trimStartParagraph(src.join(' '))

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




const addBrakesByPattern = (pattern, text) => {

  const patterns = [...pattern]

  const src = text.split(' ')

  for (const [i, el] of src.entries()) {

    for (const x of patterns) {
      if (el === x.toUpperCase()) {
        src[i - 1] = `${src[i - 1]}\n\n`
      }
    }

  }

  return trimStartParagraph(src.join(' '))

}







// ----- EVENTS HANDLERS

let origin_youtube_text = ''
let text_without_timestamps_and_brakes = ''
let textWithDotsSpaces = ''
let textWithCustomSpaces = ''




btn_Fix.addEventListener('click', function () {

  origin_youtube_text = textAreaInput.value

  text_without_timestamps_and_brakes = find_and_remove_timestamps_and_brakes(origin_youtube_text)

  textAreaPreviewWithoutTS.value = text_without_timestamps_and_brakes

  contentFirstWord.textContent = create_string_from_first_five_words(text_without_timestamps_and_brakes)

  textAreaInput.value = text_without_timestamps_and_brakes

  switch_border_to_active_previewBox(previeBox2)

  document.querySelector('.previe_box_2').classList.remove('display_none')

  document.querySelector('.subheading2').classList.remove('display_none')

  textAreaInput.scrollTo(0, 0)
})






btn_Brakes.addEventListener('click', function () {

  textWithDotsSpaces = addBrakesAfterDots(text_without_timestamps_and_brakes)


  textAreaPreviewSpaces.value = textWithDotsSpaces

  textAreaInput.value = textWithDotsSpaces

  switch_border_to_active_previewBox(previeBox3)

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
  origin_youtube_text = ''
  text_without_timestamps_and_brakes = ''
  textWithDotsSpaces = ''
  textWithCustomSpaces = ''
  contentFirstWord.textContent = 'Enter any content...'


  switch_border_to_active_previewBox(previeBox1)


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

  contentFirstWord.textContent = create_string_from_first_five_words(find_and_remove_timestamps_and_brakes(textAreaInput.value))
});









btn_Chain.addEventListener('click', async function () {

  // 1. Clear

  textAreaInput.value = ''
  textAreaPreviewOrigin.value = ''
  textAreaPreviewWithoutTS.value = ''
  textAreaPreviewSpaces.value = ''
  origin_youtube_text = ''
  text_without_timestamps_and_brakes = ''
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
    // console.log('Text pasted.');
    textAreaPreviewOrigin.value = textAreaInput.value

  } catch (error) {
    console.log('Failed to read clipboard');
  }

  textAreaInput.scrollTo(0, 0)

  contentFirstWord.textContent = create_string_from_first_five_words(find_and_remove_timestamps_and_brakes(textAreaInput.value))

  // 3. Fix TimeStamps

  origin_youtube_text = textAreaInput.value
  text_without_timestamps_and_brakes = find_and_remove_timestamps_and_brakes(textAreaInput.value)
  textAreaPreviewWithoutTS.value = text_without_timestamps_and_brakes
  contentFirstWord.textContent = create_string_from_first_five_words(find_and_remove_timestamps_and_brakes(textAreaInput.value))

  textAreaInput.value = text_without_timestamps_and_brakes

  switch_border_to_active_previewBox(previeBox2)

  document.querySelector('.previe_box_2').classList.remove('display_none')
  document.querySelector('.subheading2').classList.remove('display_none')


  // 4. Add brakes

  if (autoPatternsBrakes.checked) {

    const pattern = patternsForBrakes.value.split(' ')

    textAreaInput.value = addBrakesByPattern(pattern, find_and_remove_timestamps_and_brakes(textAreaInput.value))

    textAreaPreviewSpaces.value = textAreaInput.value

    switch_border_to_active_previewBox(previeBox3)



    document.querySelector('.previe_box_3').classList.remove('display_none')
    document.querySelector('.subheading3').classList.remove('display_none')

    textAreaInput.scrollTo(0, 0)

  } else {


    textWithDotsSpaces = addBrakesAfterDots(text_without_timestamps_and_brakes)

    textAreaPreviewSpaces.value = textWithDotsSpaces

    textAreaInput.value = textWithDotsSpaces

    switch_border_to_active_previewBox(previeBox3)

    document.querySelector('.previe_box_3').classList.remove('display_none')
    document.querySelector('.subheading3').classList.remove('display_none')

    textAreaInput.scrollTo(0, 0)

  }




  // 5. Copy final text

  copyToClipboard('.textArea_inPut')


})




btn_Pattern_Brakes.addEventListener('click', function () {

  const pattern = patternsForBrakes.value.split(' ')

  textAreaInput.value = addBrakesByPattern(pattern, find_and_remove_timestamps_and_brakes(textAreaInput.value))

  textAreaPreviewSpaces.value = textAreaInput.value

  switch_border_to_active_previewBox(previeBox3)


  document.querySelector('.previe_box_3').classList.remove('display_none')
  document.querySelector('.subheading3').classList.remove('display_none')

  textAreaInput.scrollTo(0, 0)

})











// ----- ADD DECO BORDERS TO PREVIEW PAGES


const switch_border_to_active_previewBox = preview_element => {

  for (const item of previewBoxes) {
    item.classList.remove('preview_active')
  }

  preview_element.classList.add('preview_active')

}



const switch_active_border_class_previewBox = () => {

  previewBoxes.forEach((element, idx) => {

    element.addEventListener('click', function () {

      const active_previewBox = document.querySelector(`.previe_box_${idx + 1}`)

      switch_border_to_active_previewBox(active_previewBox)

    })

  })

}


switch_active_border_class_previewBox()




