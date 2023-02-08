
1) юзер вставляет исходный неформатированный текст в TextArea



2) юзер нажимает кнопку __Delete TS__ (html class: '.btn_fix', js: btn_Fix) 


2.1.) исходный неформатированный текст -> попадает в фукнцию __findAndRemoreTimestampsUI(parameter: string)__

Input:
String

"science-based tools for everyday life.
0:05
[MUSIC PLAYING] I'm Andrew Huberman, and I'm a professor
0:10
of neurobiology and ophthalmology at Stanford School of Medicine. Today we are discussing fertility.
0:16
We will discuss male fertility and female fertility. And I should mention that today's discussion is not just"

2.2.) Входящий текст конвертируется в массив по пробелам. Получаем:

Array:

['ANDREW', 'HUBERMAN:', 'Welcome', 'to', 'the', 'Huberman', 'Lab', 'podcast,', 'where', 'we', 'discuss', 'science', 'and', 'science-based', 'tools', 'for', 'everyday', 'life.\n0:05\n[MUSIC', 'PLAYING]', "I'm", 'Andrew', 'Huberman,', 'and', "I'm", 'a', 'professor\n0:10\nof', 'neurobiology', 'and', 'ophthalmology', 'at', 'Stanford', 'School', 'of', 'Medicine.', 'Today', 'we', 'are', 'discussing', 'fertility.\n0:16\nWe', 'will', 'discuss', 'male', 'fertility', 'and', 'female', 'fertility.', 'And', 'I', 'should', 'mention', 'that', "today's", 'discussion', 'is', 'not', 'just\n0:23\nfor', 'people', 'who', 'are', 'seeking', 'to', 'conceive', 'children', 'or', 'who', 'want', 'to', 'know', 'how', 'their', 'children', 'were', 'conceived,', 'but', "it's", 'really', 'for', 'everybody.\n0:29\nAnd', 'I', 'say', 'that']


2.3.) Отлавливаем в массиве элементы, которые содержать таймштампы по триггеру: word.includes('\n'). 

Пример таких элементов:

'professor\n0:10\nof'
'fertility.\n0:16\nWe'
'just\n0:23\nfor'

То есть в них всегда содержится '\n'.

2.4.) Каждый такой найденный элемент прогоняем через функцию __remove_timestamps_from_trigger_word(parameter: string)__ по изменению элемента путем удаления из него части '\n0:16\n' и заменой ее на пробел, так как она находится межул словами. Возвращается элемент без таймштампа:

Input:
String

'professor\n0:10\nof'
'fertility.\n0:16\nWe'
'just\n0:23\nfor'

Output:
String

'professor of'
'fertility. We'
'just for'

2.5.) заменяем в массиве элементы слова с таймштампами на скорректированные без тайм штампов: 'professor\n0:10\nof' ->  'professor of'

2.6.) соединяем массив уже без элементов слов с таймштампами в единый текст

Output:
String

"science-based tools for everyday life. [MUSIC PLAYING] I'm Andrew Huberman, and I'm a professor of neurobiology and ophthalmology at Stanford School of Medicine. Today we are discussing fertility. We will discuss male fertility and female fertility. And I should mention that today's discussion is not just"























Index2.html - Разделение входящего текста на логические блоки по таймштампам


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
