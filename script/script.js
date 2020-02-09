'use strict';
document.addEventListener('DOMContentLoaded', () => {

  /* функция проверки введенного значения на число isNumber, с помощью
  - parseFloat извлекаем число с плавающей запятой, а
  - isFinite определяем является ли значение конечным.*/
  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  const isText = (t) => {
    return (t === 'undefined' || !t || t.length === 0 || t === "" ||
        !/[^\s]/.test(t) || /^\s*$/.test(t) || t.replace(/\s/g,"") === "");
  };

  let money, /* переменная обязательно должна быть let (не const), иначе не будет работать const start
      функция для ввода месячного дохода с проверкой на число с помощью isNumber*/
      start = () => {
        do {
          money = +prompt('Ваш месячный доход?', '10000');
        }
        while (!isNumber(money));
        /* у функции проверки на число есть альтернатива:
        while(isNaN(money) || money === '' || money === null)*/
      };
  start();

  // Объект содержит переменные (свойства объекта)
  const appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100500,
    period: 5,
    asking: () => {
      const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
          'Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг');
      // Перевод данный строки addExpenses в массив
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm(`Есть ли у вас депозит в банке? OK = Да`);
      appData.income = appData.getIncomeMonth();
      appData.expenses = appData.getExpensesMonth();
      appData.expensesMonth = appData.getExpensesMonthSum();
      // считаем дневной бюджет на основе budgetMonth
      appData.budgetMonth = appData.getBudget();
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      appData.targetMonth = appData.getTargetMonth();
      appData.statusIncome = appData.getStatusIncome();
      appData.targetCheck = appData.reachTargetCheck();
    },
    // getIncomeMonth - функция определения возможных доходов с проверкой на число
    getIncomeMonth: () => {
      const result = {};
      let incomeTitle = '',
          incomeValue = 0;
      if (confirm('Есть ли у тебя дополнительный источник заработка?')) {
        for (let i = +0; i < 1; i++) {
          do {
            incomeTitle = prompt('Какой у вас дополниельный заработок?', 'Таксёрство');
          }
          while (isText(incomeTitle));
          do {
            incomeValue = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
          }
          while (!isNumber(incomeValue));
          if (incomeTitle) {
            result[incomeTitle] = incomeValue;
          }
        }
      }
        return result;
    },
    // getExpensesMonth - функция определения обязательных расходов с проверкой на число
    getExpensesMonth: () => {
      const result = {};
      let expensesTitle = '',
          expensesValue = 0;
      for (let i = +0; i < 3; i++) {
        do {
          expensesTitle = prompt('Введите обязательную статью расходов?', 'Машина ' + i);
        }
        while (isText(expensesTitle));
        do {
          expensesValue = prompt('Во сколько это обойдется?', '1000');
        }
        while (!isNumber(expensesValue));
        if (expensesTitle) {
          result[expensesTitle] = +expensesValue;
        }
      }
      return result;
    },
    /* getExpensesMonthSum - функция суммирует обязательные статьи расходов
      альтернативный (for in) вариант: return Object.values(appData.expenses).reduce((a, b) => a + b, 0);
    */
    getExpensesMonthSum: () => {
      let sum = 0;
      for (let expensesValue in appData.expenses) {
        sum += appData.expenses[expensesValue];
      }
      return sum;
    },
    // getBudget (в прошлом getAccumulatedMonth) - функция возвращает накопления за месяц (доходы - расходы)
    getBudget: () => {
      return (appData.budget - appData.expensesMonth);
    },
    // getTargetMonth - считаем за какой период будет достигнута цель mission, зная результат месячного накопления
    getTargetMonth: () => {
      return Math.ceil(appData.mission / appData.budgetMonth);
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
    },
    // функция определяет достижение цели при отрицательном значении
    reachTargetCheck: () => {
      if (appData.targetMonth < 0) {
        return ('Цель не будет достигнута');
      } else {
        return (`Цель будет достигнута за ${appData.targetMonth} мес.`);
      }
    },
    getInfoDeposit: () => {
      if (appData.deposit) {
        do {
          appData.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while (!isNumber(appData.percentDeposit));
        do {
          appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
        }
        while (!isNumber(appData.moneyDeposit));
      }
    },
    calcEarnedMoney: () => {
      return appData.budgetMonth * appData.period;
    },
};
  appData.asking();
  appData.getBudget();
  appData.getInfoDeposit();

  console.log('Обязательные расходы за месяц, ₽:', appData.expensesMonth);
  console.log(appData.targetCheck);
  console.log('Уровень дохода:', appData.statusIncome);
/*  console.log('Массив в строку через запятую без большой буквы:',
      appData.addExpenses.join(', ').charAt(0));*/
  console.log('Массив в строку через запятую и с большой буквы:',
      appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));

/*  for (let key in appData) {
    console.log('Ключ: ' + key + ' ' + 'Значение: ' + appData[key]);
  }*/
});