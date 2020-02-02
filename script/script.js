'use strict';
document.addEventListener('DOMContentLoaded', () => {

  const money = +prompt('Ваш месячный доход?', 10000),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      "Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг"),
    deposit = confirm('Есть ли у вас депозит в банке?', 'Да', 'Нет'),
    income = 'Freelance',
    mission = 100500,
    period = 5;

  console.log('Ваш месячный доход, ₽?: ', typeof money);
  console.log('Тип данных переменной "income": ', typeof income);
  console.log('Есть ли у вас депозит в банке?: ', typeof deposit);
  console.log('Длина строки "addExpenses": ', addExpenses.length);
  console.log(`Период равен`, period, `мес.`);
  console.log(`Цель заработать, ₽:`, mission * period);

  const expenses1 = prompt('Введите обязательную статью расходов?', 'Машина'),
    amount1 = +prompt('Во сколько это обойдется?', 1000),
    expenses2 = prompt('Введите ещё одну обязательную статью расходов?', 'Коммунальные платежи'),
    amount2 = +prompt('Во сколько это обойдется?', 2000);

  const budgetMonth = money - amount1 - amount2,
    budgetDay = Math.floor(budgetMonth / 30);

  console.log('Возможные расходы за рассчитываемый период: ', addExpenses.toLowerCase().split(', '));
  console.log(`Бюджет на месяц (доходы - расходы), ₽:`, budgetMonth);
  console.log(`Цель будет достигнута за`, Math.ceil(mission / budgetMonth), `мес.`);
  console.log(`Дневной бюджет (доход за месяц / 30), ₽:`, budgetDay);

  const abilityToPay = () => {
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
  console.log(abilityToPay());
});