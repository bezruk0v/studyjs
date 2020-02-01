'use strict';
document.addEventListener('DOMContentLoaded', () => {

  let money = +prompt('Ваш месячный доход?', '10000');
  let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      'Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг')
    .toLowerCase().split(', ');
  let deposit = confirm('Есть ли у вас депозит в банке?', 'Да', 'Нет');
  let income = 'Freelance';
  let mission = 100500;
  let period = 5;

  let showTypeOf = function (data) {
    console.log(data, typeof (data));
  };

  showTypeOf(money); // Ваш месячный доход, ₽?:
  showTypeOf(income); // Тип данных переменной "income":
  showTypeOf(deposit); // Есть ли у вас депозит в банке?:
  showTypeOf(addExpenses.length); // Длина строки "addExpenses":
  showTypeOf(`Цель заработать ${mission * period}₽` + ' ' + `за период равный ${period} месяцам`);
  showTypeOf(addExpenses); // Вывод возможных расходов в виде массива

  let expenses1 = prompt('Введите обязательную статью расходов?', 'Машина'),
    amount1 = +prompt('Во сколько это обойдется?', '1000'),
    expenses2 = prompt('Введите ещё одну обязательную статью расходов?', 'Коммунальные платежи'),
    amount2 = +prompt('Во сколько это обойдется?', '2000');

  const getExpensesMonth = function (a, b) {
    return a + b;
  };

  const getAccumulatedMonth = function (a) {
    return a;
  };

  const getTargetMonth = function (a, b) {
    return Math.ceil(a / b);
  };

  const accumulatedMonth = getAccumulatedMonth(money) - getExpensesMonth(amount1, amount2);
  const budgetDay = Math.floor(accumulatedMonth / 30);

  showTypeOf(accumulatedMonth); // Бюджет на месяц (доходы - расходы), ₽
  showTypeOf(getTargetMonth(mission, accumulatedMonth)); // Cрок достижения цели в месяцах
  showTypeOf(budgetDay); // Бюджет на день

  const getStatusIncome = function () {
    if (budgetDay > 1200) {
      return ('У вас высокий уровень дохода!');
    } else if (budgetDay >= 600 && budgetDay <= 1200) {
      return ('У вас средний уровень дохода.');
    } else if (budgetDay < 600 && budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего...');
    } else {
      return ('Что то пошло не так!');
    }
  };
  showTypeOf(getStatusIncome());
});