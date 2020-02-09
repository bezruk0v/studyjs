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

  const calculate = document.getElementById('start'),
      // Кнопка "Рассчитать"
      pluses = document.getElementsByTagName('button'),
      // Кнопки через html tag
      plusIncome = pluses[0],
      // первый "+" - Дополнительные доходы
      plusExpenses = pluses[1],
      // второй "+" - Обязательные расходы
      checkBoxDeposit = document.querySelector('#deposit-check'),
      // кнопка чекбокса "Депозит"
      fieldAddIncome = document.querySelectorAll('.additional_income-item'),
      // поле ввода "Возможный доход"
      fieldsOutput = document.querySelectorAll('.result-total'),
      // поля вывода
      budgetMonthValue = fieldsOutput[0],
      // поле вывода "Доход за месяц"
      budgetDayValue = fieldsOutput[1],
      // поле вывода "Дневной бюджет"
      expensesMonthValue = fieldsOutput[2],
      // поле вывода "Расход за месяц"
      additionalIncomeValue = fieldsOutput[3],
      // поле вывода "Возможные доходы"
      additionalExpensesValue = fieldsOutput[4],
      // поле вывода "Возможные расходы"
      incomePeriodValue = fieldsOutput[5],
      // поле вывода "Накопления за период"
      targetMonthValue = fieldsOutput[6],
      // поле вывода "Срок достижения цели в месяцах"
      salaryAmount = document.querySelector('.salary-amount'),
      // поле ввода "Месячный доход"
      incomeTitle = document.querySelector('.income-title'),
      // поле наименования "Дополнительный доход"
      incomeAmount = document.querySelector('.income-amount'),
      // поле суммы "Дополнительные доходы"
      expensesTitle = document.querySelector('.expenses-title'),
      // поле наименования "Обязательные расходы"
      expensesAmount = document.querySelector('.expenses-amount'),
      // поле суммы "Обязательные расходы"
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      // поле ввода "Возможны расходы"
      targetAmount = document.querySelector('.target-amount'),
      // поле ввода "Цель"
      periodSelect = document.querySelector('.period-select');
      // диапазон "Период расчета"

  // полученные значения в консоль
  console.log('Кнопка "Рассчитать":', calculate);
  console.log('"+" - Дополнительные доходы:', plusIncome);
  console.log('"+" - Обязательные расходы:', plusExpenses);
  console.log('кнопка чекбокса "Депозит":', checkBoxDeposit);
  console.log('поле ввода "Возможный доход":', fieldAddIncome);
  console.log('поля вывода (resultTotal):', fieldsOutput);
  console.log('поле вывода "Доход за месяц":', budgetMonthValue);
  console.log('поле вывода "Дневной бюджет":', budgetDayValue);
  console.log('поле вывода "Расход за месяц":', expensesMonthValue);
  console.log('поле вывода "Возможные доходы":', additionalIncomeValue);
  console.log('поле вывода "Возможные расходы":', additionalExpensesValue);
  console.log('поле вывода "Накопления за период":', incomePeriodValue);
  console.log('поле вывода "Срок достижения цели в месяцах":', targetMonthValue);
  console.log('поле ввода "Месячный доход":', salaryAmount);
  console.log('поле наименования "Дополнительный доход":', incomeTitle);
  console.log('поле суммы "Дополнительные доходы":', incomeAmount);
  console.log('поле наименования "Обязательные расходы":', expensesTitle);
  console.log('поле суммы "Обязательные расходы:', expensesAmount);
  console.log('поле ввода "Возможны расходы"":', additionalExpensesItem);
  console.log('оле ввода "Цель":', targetAmount);
  console.log('диапазон "Период расчета":', periodSelect);

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
      if (addExpenses) {
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        for (let i = 0; i < 2; i++) {
          appData.addExpenses[i] = appData.addExpenses[i].trim();
        }
      } else {
        appData.addExpenses = ['вы не ввели указали возможные расходы!'];
      }
      /*const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
          'Машина, Коммунальные платежи, Продукты, Интернет, Сотовая связь, Хостинг');*/
      // Перевод данный строки addExpenses в массив
      // appData.addExpenses = addExpenses.toLowerCase().split(',');
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
      let result = {};
      let incomeTitle = '',
          incomeValue = 0;
      if (confirm('Есть ли у тебя дополнительный источник заработка?')) {
        for (let i = +0; i < 1; i++) {
          do {
            incomeTitle = prompt('Какой у вас дополниельный заработок?', 'Таксёрство');
            if (!incomeTitle) {
              break;
            }
          }
          while (isText(incomeTitle));
          if (incomeTitle) {
            do {
              incomeValue = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
              if (!incomeValue) {
                break;
              }
            }
            while (!isNumber(incomeValue));
            if (incomeTitle) {
              result[incomeTitle] = incomeValue;
            }
          }
        }
      }
      return result;
    },
    // getExpensesMonth - функция определения обязательных расходов с проверкой на число
    getExpensesMonth: () => {
      const result = {};
      let expensesTitle = '',
          expensesValue = 0,
          nextExpense;
      for (let i = 0; i < 2; i++) {
        do {
          expensesTitle = prompt('Введите обязательную статью расходов?', 'Машина ' + i);
          if (!expensesTitle) {
            break;
          }
        }
        while (isText(expensesTitle));
        if (expensesTitle) {
          do {
            expensesValue = prompt('Во сколько это обойдется?', '1000');
            if (!expensesValue) {
              break;
            }
          }
          while (!isNumber(expensesValue));
        }
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
          if (!appData.deposit) {
            break;
          } else if (!appData.percentDeposit) {
            break;
          }
        }
        while (!isNumber(appData.percentDeposit));
        if (appData.percentDeposit) {
          do {
            appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            if (!appData.moneyDeposit) {
              break;
            }
          }
          while (!isNumber(appData.moneyDeposit));
        }
      }
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