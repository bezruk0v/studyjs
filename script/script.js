'use strict';
document.addEventListener('DOMContentLoaded', () => {

  var money = -10,
      income = 1000;

  let message = function() {
    alert('Привет!'+ ' ' +
          'Изучил git и github. Готов к заработку' + ' ' +
          income + '₽');
  };

  document.getElementById('github').addEventListener('click', message);

  
  console.log('Привет, Мир!'+ ' ' +
        'Нажми ОК и отправь мне' + ' ' +
        income + '₽');
  
  const addExpenses = [10, 200, 50, 400],
        deposit = 100;

  let mission = money+income,
      period = [100, 2234, 3000, [4-1], 'q'];

  console.log(mission+deposit-addExpenses[1]);
  console.log(period[4]);

});