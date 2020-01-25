'use strict';
document.addEventListener('DOMContentLoaded', () => {

      const money = 15000,
            income = 'Freelance',
            addExpenses = 'Taxi, Products, Communal payments, Internet, Hosting, Taxes',
            deposit = 5 !== 1,
            mission = 100500,
            period = 5,
            budgetDay = money / 30;

      console.log(money, income, deposit);
      console.log(addExpenses.length);
      console.log(`Цель заработать ${mission * period}₽` + ' ' + `за период равный ${period} месяцам`);
      console.log(addExpenses.toLowerCase().split(', '));
      console.log(budgetDay);

      const num = 266219;

      console.log((num.toString().match(/.{1}/g).reduce((a, b) => a * b) ** 3).toString().substring(0, 2));

      const numMultiply = num.toString().match(/.{1}/g).reduce((a, b) => a * b);

      console.log(numMultiply ** 3);
      console.log((numMultiply ** 3).toString().substring(0, 2));
      
});