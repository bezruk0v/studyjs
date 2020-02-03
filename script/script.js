'use strict';
document.addEventListener('DOMContentLoaded', () => {

  /* функция проверки введенного значения на число isNumber, с помощью
  - parseFloat извлекаем число с плавающей запятой, а
  - isFinite определяем является ли значение конечным.*/
  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  let money; // переменная обязательно должна быть let (не const), иначе не будет работать const start
  const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      "Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг"),
    deposit = confirm('Есть ли у вас депозит в банке?', 'Да', 'Нет'),
    income = 'Freelance',
    mission = 100500,
    period = 5;

  // функция для ввода месячного дохода с проверкой на число с помощью isNumber
  const start = () => {
    do {
      money = prompt('Ваш месячный доход?', 10000);
    }
    while (!isNumber(money));
  };
  start();

  // функция вывода значения и определения типа данных
  const showTypeOf = (data) => {
    console.log(data, typeof (data));
  };

  showTypeOf(+money); // Ваш месячный доход, ₽
  showTypeOf(income); // Тип данных переменной "income"
  showTypeOf(deposit); // Есть ли у вас депозит в банке?
  console.log('Период равен, мес.:', period);
  console.log('Цель заработать, ₽', mission * period);

  // Перевод данный строки addExpenses в массив
  const arrayExpenses = addExpenses.toLowerCase().split(', ');
  console.log('Возможные расходы за рассчитываемый период: ', arrayExpenses);
  console.log('Длина строки "addExpenses":', addExpenses.length);

  // функция определения обязательных расходов с проверкой на число
  let expenses = [];
  const getExpensesMonth = () => {
    let sum = 0,
      checkNum = 0;

    for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов?', 'Машина');
      do {
        checkNum = prompt('Во сколько это обойдется?', 1000);
      }
      while (!isNumber(checkNum));
      sum += +checkNum;
    }
    console.log('Обязательные расходы, ₽', sum, expenses);
    return sum;
  };

  // переменная на основе функции getExpensesMonth()
  const expensesAmount = getExpensesMonth();

  // функция возвращает накопления за месяц (доходы - расходы)
  const getAccumulatedMonth = () => {
    return (money - expensesAmount);
  };

  // переменная на основе функции getAccumulatedMonth()
  const accumulatedMonth = getAccumulatedMonth();
  console.log('Бюджет на месяц (доходы - расходы), ₽:', accumulatedMonth);

  // считаем за какой период будет достигнута цель mission, зная результат месячного накопления
  const getTargetMonth = () => {
    return Math.ceil(mission / accumulatedMonth);
  };

  // функция определяет достижение цели при отрицательном значении
  const reachTargetCheck = () => {
    if (getTargetMonth() < 0) {
      return ('Цель не будет достигнута');
    } else {
      return (`Цель будет достигнута за ${getTargetMonth()} мес.`);
    }
  };
  console.log(reachTargetCheck());

  // считаем дневной бюджет на основе accumulatedMonth
  const budgetDay = Math.floor(accumulatedMonth / 30);
  console.log('Дневной бюджет (доход за месяц / 30), ₽', budgetDay);

  // функция производит оценку дохода на основе budgetDay
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