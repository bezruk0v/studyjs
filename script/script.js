'use strict';
document.addEventListener('DOMContentLoaded', () => {

      const money = 15000,
            income = 'Freelance',
            addExpenses = 'Taxi, Products, Communal payments, Internet, Hosting, Taxes',
            deposit = 5 !== 1,
            mission = 100500,
            period = 5,
            budgetDay = money / 30;

      console.log('Тип данных переменной "money": ',typeof money);
      console.log('Тип данных переменной "income": ',typeof income);
      console.log('Тип данных переменной "deposit": ',typeof deposit);
      console.log('Длина строки "addExpenses": ',addExpenses.length);
      console.log(`Цель заработать ${mission * period}₽` + ' ' + `за период равный ${period} месяцам`);
      console.log('Значения строки "addExpenses" к нижнему регистру и разбиты на массив: ',addExpenses.toLowerCase().split(', '));
      console.log('Дневной бюджет (доход за месяц / 30): ',budgetDay);

});