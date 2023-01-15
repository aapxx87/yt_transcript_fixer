// ----- TextAreas
const textAreaInput = document.querySelector('.textArea_inPut')
const textAreaOutput = document.querySelector('.textArea_outPut')
const textAreaOutputBrakesByDots = document.querySelector('.textArea_output_brakes_by_dots')

// ----- Buttons
const btn_Fix = document.querySelector('.btn_fix')
const btn_Brakes = document.querySelector('.btn_brakes')
const btn_Cust_Brakes = document.querySelector('.btn_custom_brakes')
const btn_Clear = document.querySelector('.btn_clear')

// ----- Inputs
const inputDotsNumber = document.querySelector('.input_dots_number')
const inputCustomBrakes = document.querySelector('.input_custom_brakes')
const input_check_auto_brakes = document.querySelector('input[type=checkbox]')



// const str1 = "life\n0:09\nI'm"
// const str2 = "are\n0:15\ndiscussing"
// const str3 = "I\n0:22\nwant"




// ----- FUNCTIONS


const removeBrakesFromWord = word => {

  const iFirst = word.indexOf('\n')
  const iLast = word.lastIndexOf('\n')

  const wordArr = word.split('')

  wordArr.splice(iFirst, iLast - iFirst + 1, ' ')

  return wordArr.join('')
}


// removeBrakesFromWord(str3)


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

  const dotsNumber = Number(inputDotsNumber.value)

  const src = text.split(' ')

  let acc = 0

  for (const [i, el] of src.entries()) {

    if (el[el.length - 1] === '.') {
      acc++
    }

    if (el[el.length - 1] === '.' && acc === dotsNumber) {
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



const addBrakesByPattern = (pattern, text) => {

  const patterns = [...pattern]

  const src = text.split(' ')

  for (const [i, el] of src.entries()) {

    for (const x of patterns) {
      if (el === x) {
        src[i - 1] = `${src[i - 1]}\n\n`
      }
    }

  }

  // console.log(src.join(' '));

  return src.join(' ')
}







// ----- EVENTS HANDLERS


btn_Fix.addEventListener('click', function () {
  textAreaOutput.textContent = findAndRemoreTimestampsUI(textAreaInput.value)

  console.log(textAreaInput.value);

  if (input_check_auto_brakes.checked) {
    textAreaOutputBrakesByDots.textContent = addBrakesAfterDots(findAndRemoreTimestampsUI(textAreaInput.value))
  }

})



btn_Brakes.addEventListener('click', function () {
  textAreaOutputBrakesByDots.textContent = addBrakesAfterDots(findAndRemoreTimestampsUI(textAreaInput.value))
})


btn_Cust_Brakes.addEventListener('click', function () {

  const pattern = inputCustomBrakes.value.split(' ')

  textAreaOutputBrakesByDots.textContent = addBrakesByPattern(pattern, findAndRemoreTimestampsUI(textAreaInput.value))

})


btn_Clear.addEventListener('click', function () {
  textAreaInput.value = ""
  textAreaOutput.textContent = ""
  textAreaOutputBrakesByDots.textContent = ""
})



const pasteButton = document.querySelector('.btn_paste');

pasteButton.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText()
    textAreaInput.value += text;
    console.log('Text pasted.');
  } catch (error) {
    console.log('Failed to read clipboard');
  }
});


