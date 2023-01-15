// const originalText = document.querySelector('.original_text')
// const originalContent = originalText.textContent


const deleteTimeStampsAndSpaces = (text) => {

  const src = text.split(' ')

  for (const [i, el] of src.entries()) {

    // find and remove timestamps: '1:13\n'
    if (el.includes(':') && el.includes('\n')) {
      // remove empty string elements (spaces) - 3 before and after timestam0
      src.splice(i - 3, 7)
      // find and remove elements with: 'life\n'
    } else if (el.includes('\n')) {
      const fixWord = el.replace('\n', "")
      src.splice(i, 1, fixWord)
    }

  }

  // find and remove empty string elements (spaces)
  for (const [i, el] of src.entries()) {
    if (el.length === 0) {
      src.splice(i, 3)
    }
  }

  return src.join(' ')

}

// console.log(deleteTimeStampsAndSpaces(originalContent));



// const addBrakesAfterDots = text => {

//   const src = text.split(' ')

//   let acc = 0

//   for (const [i, el] of src.entries()) {

//     if (el[el.length - 1] === '.') {
//       acc++
//     }

//     if (el[el.length - 1] === '.' && acc === 5) {
//       src.splice(i + 1, 0, '\n\n');
//       acc = 0
//     }

//   }

//   return src.join(' ')

// }

// console.log(addBrakesAfterDots(deleteTimeStampsAndSpaces(originalContent)));




// const pattern = ['LEX', 'ANDREW']

// const pattern = ['-']

// const addBrakesByPattern = (pattern, text) => {

//   const patterns = [...pattern]

//   const src = text.split(' ')

//   for (const [i, el] of src.entries()) {

//     for (const x of patterns) {

//       if (el === x) {
//         src[i - 1] = `${src[i - 1]}\n\n`
//       }

//     }

//   }

//   console.log(src.join(' '));

//   return src.join(' ')


// }


// addBrakesByPattern(pattern, deleteTimeStampsAndSpaces(originalContent))








