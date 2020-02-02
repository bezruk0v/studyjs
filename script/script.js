'use strict';
document.addEventListener('DOMContentLoaded', () => {

  const money = +prompt('Ваш месячный доход?', 10000),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      "Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг"),
    deposit = confirm('Есть ли у вас депозит в банке?', 'Да', 'Нет'),
    income = 'Freelance',
    mission = 100500,
    period = 5;

  const showTypeOf = (data) => {
    console.log(data, typeof (data));
  };

  showTypeOf(money); // Ваш месячный доход, ₽
  showTypeOf(income); // Тип данных переменной "income"
  showTypeOf(deposit); // Есть ли у вас депозит в банке?
  console.log('Длина строки "addExpenses":', addExpenses.length);
  console.log('Период равен, мес.:', period);
  console.log('Цель заработать, ₽', mission * period);

  const expenses1 = prompt('Введите обязательную статью расходов?', 'Машина'),
    amount1 = +prompt('Во сколько это обойдется?', 1000),
    expenses2 = prompt('Введите ещё одну обязательную статью расходов?', 'Коммунальные платежи'),
    amount2 = +prompt('Во сколько это обойдется?', 2000);

  const getExpensesMonth = () => {
    return (amount1 + amount2);
  };

  const getAccumulatedMonth = () => {
    return (money - getExpensesMonth());
  };

  const accumulatedMonth = getAccumulatedMonth();

  const getTargetMonth = () => {
    return Math.ceil(mission / accumulatedMonth);
  };

  const budgetDay = Math.floor(accumulatedMonth / 30);

  console.log('Возможные расходы за рассчитываемый период: ', addExpenses.toLowerCase().split(', '));
  console.log('Бюджет на месяц (доходы - расходы), ₽:', accumulatedMonth);
  console.log(`Цель будет достигнута за ${getTargetMonth()} мес.`);
  console.log('Дневной бюджет (доход за месяц / 30), ₽', budgetDay);

  const getStatusIncome = () => {

    if (budgetDay < 0) {
      return ('Что то пошло не так!');
    } else if (budgetDay <= 600) {
      return ('К сожалению, у вас уровень дохода ниже среднего...');
    } else if (budgetDay <= 1200) {
      return ('У вас средний уровень дохода.');
    } else {
      return ('У вас высокий уровень дохода!');
    }
  };

  console.log(getStatusIncome());

});