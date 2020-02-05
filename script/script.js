'use strict';
document.addEventListener('DOMContentLoaded', () => {

  /* функция проверки введенного значения на число isNumber, с помощью
  - parseFloat извлекаем число с плавающей запятой, а
  - isFinite определяем является ли значение конечным.*/
  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  let money, // переменная обязательно должна быть let (не const), иначе не будет работать const start
    // функция для ввода месячного дохода с проверкой на число с помощью isNumber
    start = () => {
      do {
        money = prompt('Ваш месячный доход?', '10000');
      }
      while (!isNumber(money));
      /* у функции проверки на число есть альтернатива:
      while(isNaN(money) || money === '' || money === null)*/
    };
  start();

  // Объект содержит переменные (свойства объекта)
  const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100500,
    period: 5,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: () => {
      const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        "Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг");
      appData.addExpenses.toLowerCase().split(', '); // Перевод данный строки addExpenses в массив
      appData.deposit = confirm(`'Есть ли у вас депозит в банке?', 'Да', 'Нет'`);
    },
    getExpensesMonth: () => { // функция определения обязательных расходов с проверкой на число
      let sum = 0,
        checkNum = 0;
      for (let i = 0; i < 2; i++) {
        appData.expenses[i] = prompt('Введите обязательную статью расходов?', 'Машина');
        do {
          checkNum = prompt('Во сколько это обойдется?', '1000');
        }
        while (!isNumber(checkNum));
        sum += +checkNum;
      }
      return sum;
    },
      // функция возвращает накопления за месяц (доходы - расходы)
    getAccumulatedMonth: () => {
    return (money - appData.getExpensesMonth);
    },
      // считаем за какой период будет достигнута цель mission, зная результат месячного накопления
    getTargetMonth: () => {
    return Math.ceil(appData.mission / appData.getAccumulatedMonth);
    },
      // функция производит оценку дохода на основе budgetDay
    getStatusIncome: () => {
    if (appData.budgetDay < 0) {
      return ('Что то пошло не так!');
    } else if (appData.budgetDay <= 600) {
      return ('К сожалению, у вас уровень дохода ниже среднего...');
    } else if (appData.budgetDay <= 1200) {
      return ('У вас средний уровень дохода.');
    } else {
      return ('У вас высокий уровень дохода!');
    }
    }
  };

  // переменная на основе функции getAccumulatedMonth()
  const accumulatedMonth = appData.getAccumulatedMonth();
  console.log('Бюджет на месяц (доходы - расходы), ₽:', accumulatedMonth);

  // функция определяет достижение цели при отрицательном значении
  const reachTargetCheck = () => {
    if (appData.getTargetMonth() < 0) {
      return ('Цель не будет достигнута');
    } else {
      return (`Цель будет достигнута за ${appData.getTargetMonth()} мес.`);
    }
  };
  console.log(reachTargetCheck());

  // // считаем дневной бюджет на основе accumulatedMonth
  // const budgetDay = Math.floor(accumulatedMonth / 30);
  // console.log('Дневной бюджет (доход за месяц / 30), ₽', budgetDay);

  console.log('Период равен, мес.:', appData.period);
  console.log('Цель заработать, ₽', appData.mission * appData.period);
  console.log('Длина строки "addExpenses":', appData.addExpenses.length);

  // переменная на основе функции getExpensesMonth()
  const expensesAmount = appData.getExpensesMonth();

  console.log(appData.getStatusIncome());
  console.log('Обязательные расходы, ₽', appData.getExpensesMonth().sum, appData.expenses);

});