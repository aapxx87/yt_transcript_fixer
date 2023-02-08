Разделение входящего текста на логические блоки по таймштампам


1) передаем текст из инпута с таймштампами в функцию __splitTextToArrByBrakes(parameter: string)__. 

Нам нужно выделить из сплошного текста, получаемого из textarea, отдельные элементы с таймштампом и названием раздела.

Она делит исходный текст на массив с разделением по переносу строки, таймштамп и его название становятся единым элементом в массиве. То есть мы получаем на выходе массив из элементов в формате string: 

Input:
String

"00:00 Introduction 
04:53 The Daily (Learning) Routine
07:13 Plasticity Is NOT the Goal"

Output:
Array

[
  "00:00 Introduction ",
  "04:53 The Daily (Learning) Routine",
  "07:13 Plasticity Is NOT the Goal"
]


const split_TextToArrByBrakes = text => {
  // делим текст на элементы массива по новой строчке
  const splitByBrakesArr = text.split('\n')
  return splitByBrakesArr
}







2) передвем результат __splitTextToArrByBrakes(parameter: string)__ в функцию __separate_TSandNamesArr(parameter: array)__

Нам нужно выделить отдельно таймштамп и отдельно название.

Она создает мновый массив, каждый элемент которого это массив из двух элементов таймштамп и название

Input:
Array

[
  "00:00 Introduction ",
  "04:53 The Daily (Learning) Routine",
  "07:13 Plasticity Is NOT the Goal"
]


Output:
Array

[
 ['00:00', 'Introduction '],
 ['04:53', 'The Daily (Learning) Routine'],
 ['07:13', 'Plasticity Is NOT the Goal']
]


const separate_TSandNamesArr = arr => {

  const newArr = []

  for (const [idx, el] of arr.entries()) {

    // находим индекс первого пробела, который идет сразу после таймштампа
    const indexOfSpace = el.indexOf(' ')

    // разбиваем слово на массив по каждому элементу чтобы потом разделить его на таймштам и название
    const newElement = el.split('')

    // отсекаем из массива все после таймштампа и получаем только его 
    const timeStamp = newElement.splice(0, 5).join('')

    // осталось только название после отсечения таймштампа, так как мы воздейстрвуем на первоначальный массив, но убираем первый лишний пробел
    const title = newElement.splice(1).join('')

    // пушим в массив элемент массив с таймштампом и названием
    newArr.push([timeStamp, title])

  }

  return newArr

}
