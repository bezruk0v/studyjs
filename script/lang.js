'use strict';
document.addEventListener('DOMContentLoaded', () => {

  const ru = 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье';
  const en = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';

  const lang = confirm('Выберите язык: ОК (Русский), Отмена (Английский)');

  // Решение задачи через if
  if (lang === true) {
    console.log('Дни недели: ', ru.split(', '));
  } else if (lang === false) {
    console.log('Days of week: ', en.split(', '));
  }

  // Решение задачи через switch-case
  switch (lang) {
    case true:
      console.log('Дни недели: ', ru.split(', '));
      break;
    case false:
      console.log('Days of week: ', en.split(', '));
      break;
    default:
      console.log('Что-то пошло не так!');
  }

  // Решение задачи через многомерный массив без if & switch
  const langArr = [
    [ru.split(', ')],
    [en.split(', ')]
  ];
  console.log('Дни недели: ', langArr[0]);
  console.log('Days of week: ', langArr[1]);

  // Решение задачи с помощью нескольких тернарных операторов, без использования if или switch
  const namesAndJobs = [
    ['Артем', 'Максим'],
    ['Директор', 'Преподаватель', 'Студент']
  ];

  let namePerson = prompt('Введите имя', 'Артем');

  let jobCheck =
    (namePerson === namesAndJobs[0][0]) ? namesAndJobs[1][0] :
    (namePerson === namesAndJobs[0][1]) ? namesAndJobs[1][1] : namesAndJobs[1][2];

  console.log('Должность, которая соответствует имени', `${namePerson}:`, jobCheck);

});