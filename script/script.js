'use strict';
document.addEventListener('DOMContentLoaded', () => {

      let money = prompt('Ваш месячный доход?', '10000');
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг');
      let deposit = confirm('Есть ли у вас депозит в банке?', 'Да', 'Нет');
      let income = 'Freelance';
      let mission = 100500;
      let period = 5;

      console.log('Ваш месячный доход, ₽?: ', typeof money);
      console.log('Тип данных переменной "income": ', typeof income);
      console.log('Есть ли у вас депозит в банке?: ', typeof deposit);
      console.log('Длина строки "addExpenses": ', addExpenses.length);
      console.log(`Цель заработать ${mission * period}₽` + ' ' + `за период равный ${period} месяцам`);

      let expenses1 = prompt('Введите обязательную статью расходов?', 'Машина');
      let amount1 = prompt('Во сколько это обойдется?', '1000');
      let expenses2 = prompt('Введите ещё одну обязательную статью расходов?', 'Коммунальные платежи');
      let amount2 = prompt('Во сколько это обойдется?', '2000');

      let budgetMonth = money - amount1 - amount2;
      let budgetDay = Math.floor(budgetMonth / 30);

      console.log('Возможные расходы за рассчитываемый период: ', addExpenses.toLowerCase().split(', '));
      console.log('Бюджет на месяц (доходы - расходы), ₽: ', budgetMonth);
      console.log('Цель', `${mission}₽`, 'будет достигнута за: ', Math.ceil(mission / budgetMonth), ' мес.');
      console.log('Дневной бюджет (доход за месяц / 30): ', budgetDay);

      if (budgetDay > 1200) {
            console.log('У вас высокий уровень дохода!');
      } else if (budgetDay >= 600 && budgetDay <= 1200) {
            console.log('У вас средний уровень дохода.');
      } else if (budgetDay < 600 && budgetDay >= 0) {
            console.log('К сожалению, у вас уровень дохода ниже среднего...');
      } else {
            console.log('Что то пошло не так!');
      }

});