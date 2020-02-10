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

  let calculate = document.getElementById('start'),
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
      // expensesAmount = document.querySelector('.expenses-amount'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      // поле суммы "Обязательные расходы"
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      // поле ввода "Возможны расходы"
      targetAmount = document.querySelector('.target-amount'),
      // поле ввода "Цель"
      periodSelect = document.querySelector('.period-select');
      // диапазон "Период расчета"

  // Объект содержит переменные (свойства объекта)
  let appData = {
    budget: 0,
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
    start: () => {
      /*do {
        money = +prompt('Ваш месячный доход?', '10000');
      }
      while (!isNumber(money));*/
      /* у функции проверки на число есть альтернатива:
      while(isNaN(money) || money === '' || money === null)*/
      if (salaryAmount.value === '') {
        alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
        return;
      }
      appData.budget = salaryAmount.value;
      // console.log('salaryAmountValue:', salaryAmount.value);

      appData.getExpenses();
      appData.getExpensesMonthSum();
      appData.getBudget();
      // appData.getInfoDeposit();
      appData.showResult();
    },
    showResult: () => {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
    },
    addExpensesBlock: () => {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        plusExpenses.style.display = 'none';
      }
    },
    getExpenses: () => {
      expensesItems.forEach((item) => {
        // console.log(item);
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
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
      // appData.expenses = appData.getExpensesMonth();
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

  start.addEventListener('click', appData.start);
  plusExpenses.addEventListener('click', appData.addExpensesBlock);

});