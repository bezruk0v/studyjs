'use strict';
document.addEventListener('DOMContentLoaded', () => {

      const num = 266219;
      const numMultiply = num.toString().match(/.{1}/g).reduce((a, b) => a * b);

      console.log(`Произведение цифр числа ${num}: `, numMultiply);
      console.log('Возвёл число в степень 3 с помощью оператора "**": ',(numMultiply ** 3));
      console.log('Первые две цифры: ',(numMultiply ** 3).toString().substring(0, 2));
      
});