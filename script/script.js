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

  let start = document.getElementById('start'), // Кнопка "Рассчитать"
      reset = document.getElementById('cancel'), // Кнопка "Сбросить"
      // Кнопки через html tag
      btnPlus = document.getElementsByTagName('button'),
      // первый "+" - Дополнительные доходы
      incomePlus = btnPlus[0],
      // второй "+" - Обязательные расходы
      expensesPlus = btnPlus[1],
      // кнопка чекбокса "Депозит"
      depositCheck = document.querySelector('#deposit-check'),
      // поле ввода "Возможный доход"
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      // поле вывода "Доход за месяц"
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      // поле вывода "Дневной бюджет"
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      // поле вывода "Дневной бюджет"
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      // поле вывода "Расход за месяц"
      accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
      // поле вывода "Возможные доходы"
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      // поле вывода "Возможные расходы"
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      // поле вывода "Накопления за период"
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      // поле вывода "Срок достижения цели в месяцах"
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      // поле ввода "Месячный доход"
      salaryAmount = document.querySelector('.salary-amount'),
      // поле суммы "Обязательные расходы"
      expensesItems = document.querySelectorAll('.expenses-items'),
      // поле ввода "Возможны расходы"
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      // поле ввода "Цель"
      targetAmount = document.querySelector('.target-amount'),
      // поля "Дополнительных расходов"
      incomeItems = document.querySelectorAll('.income-items'),
      // диапазон "Период расчета"
      periodSelect = document.querySelector('.period-select'),
      // значение "Периода расчета"
      periodAmount = document.querySelector('.period-amount'),
      // все поля для вывода результатов
      resultsTotal = document.querySelectorAll('.result-total');

  console.log(resultsTotal);

  // Объект с исходными переменными (свойствами объекта)
  let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomes: {},
    addIncome: [],
    incomesMonth: 0,
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: () => {

      if (salaryAmount.value !== '') {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getIncomes();
        appData.getIncomesMonth();
        appData.getAddIncomes();
        appData.getBudget();
        appData.showResult();
        start.style.display = 'none';
        reset.style.display = 'block';
      }



      // if (resultsTotal.value !== '') {
      //   appData.resetResults();
      // }
    },
    showResult: () => {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = Math.floor(appData.budgetDay);
      expensesMonthValue.value = +appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcPeriod();

      //Динамическое изменение в поле "Накопления за период"
      periodSelect.addEventListener('input', () =>
          incomePeriodValue.value = appData.calcPeriod());
    },
    addExpensesBlock: () => {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }
    },
    // передача значений "Обязательные расходы"
    getExpenses: () => {
      expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = +cashExpenses;
        }
      });
    },
    // заполнение поля "Возможные расходы"
    getAddExpenses: () => {
      let addExpenses = additionalExpensesItem.value.split(', ');
      addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    // вычисление суммы всех обязательных расходов
    getExpensesMonth: () => {
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
      return appData.expensesMonth;
    },
    // дополнительные поля "Дополнительный доход" с ограничением на 3 поля
    addIncomeBlock: () => {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
      }
    },
    // передача значений "Дополнительный доход"
    getIncomes: () => {
      incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && itemIncome !== '') {
          appData.incomes[itemIncome] = +cashIncome;
        }
      });
    },
    // заполнение поля "Возможные доходы"
    getAddIncomes: () => {
      additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (item.value !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    // вычисление суммы всех доходов
    getIncomesMonth: () => {
      for (let key in appData.incomes) {
        appData.incomesMonth += +appData.incomes[key];
      }
      return appData.incomesMonth;
    },
    // месячный и дневной бюджеты
    getBudget: () => {
      appData.budgetMonth = appData.budget + appData.incomesMonth - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
    },
    // вычисление количества месяцев для достижения цели
    getTargetMonth: () => {
      if (appData.budgetMonth < 0) {
        return 'Цель не будет достигнута';
      } else {
        return targetAmount.value / appData.budgetMonth;
      }
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
      if (targetAmount.value < 0) {
        return ('Цель не будет достигнута');
      } else {
        return (`Цель будет достигнута за ${targetAmount.value} мес.`);
      }
    },
    // метод для указания % по вкладу и его сумме
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
    // посчёт накоплений
    calcPeriod: () => {
      return appData.budgetMonth * periodSelect.value;
    },
    // вывода "Периода расчёта"
    setPeriod: () => {
      periodAmount.textContent = periodSelect.value;
      return periodAmount.textContent;
    },
    resetResults: () => {
      resultsTotal.forEach((input) => {
        input.value = '';
      });
      appData.budget = 0;
      appData.budgetDay = 0;
      appData.budgetMonth = 0;
      appData.incomes= {};
      appData.addIncome = [];
      appData.incomesMonth = 0;
      appData.expenses = {};
      appData.addExpenses = [];
      appData.expensesMonth = 0;
      appData.deposit = false;
      appData.percentDeposit = 0;
      appData.moneyDeposit = 0;
      start.style.display = 'block';
      reset.style.display = 'none';
    },

  };

  // ОС "Калькулятора" - запуск программы по кнопке "Рассчитать"
  start.addEventListener('click', appData.start);
  // ОС "Калькулятора" - сбрасываются результаты расчётов
  reset.addEventListener('click', appData.resetResults);
  // ОС "Обязательные расходы" - добавление дополнительных полей по нажатию на '+'
  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  // ОС "Дополнительные доходы" - добавление дополнительных полей по нажатию на '+'
  incomePlus.addEventListener('click', appData.addIncomeBlock);
  // ОС "Периода расчёта" - число меняется в соотвествии с движением ползунка
  periodSelect.addEventListener('input', appData.setPeriod);

});