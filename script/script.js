'use strict';
document.addEventListener('DOMContentLoaded', () => {

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


  /* функция проверки введенного значения на число isNumber, с помощью
  - parseFloat извлекаем число с плавающей запятой, а
  - isFinite определяем является ли значение конечным.*/
  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  const startDisable = () => {
    if (isNumber(salaryAmount.value) && salaryAmount.value > 0) {
      start.removeAttribute('disabled');
    }
    if (!isNumber(salaryAmount.value)) {
      start.setAttribute('disabled', 'disabled');
      salaryAmount.placeholder = "Введите число";
    }
  };

  //Функция для блокировки полей заполнения
  const inputsDisable = () => {
    //Получаем поля с левой стороны
    const data = document.querySelector('.data');
    //Получаем все поля ввода с вводом текста
    const allInputs = data.querySelectorAll('input[type=text]');
    // Блокировка всех инпутов
    allInputs.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    // Блокировка плюсов
    document.querySelectorAll('.btn_plus').forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    // Блокировка выбора периода расчетов
    periodSelect.setAttribute('disabled', 'disabled');
    // Скрытие кнопки "Рассчитать"
    start.style.display = 'none';
    // Отображение кнопки "Сбросить"
    reset.style.display = 'block';

  };

  salaryAmount.addEventListener('click', function () {
    let allInputs = document.querySelectorAll('input');
    allInputs.forEach(function(item) {
      item.value = item.defaultValue;
    });

  });

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
    statusIncome: 0,

    // метод: заполнение формы данными
    start: function () {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncomes();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncomes();
        this.getBudget();
        this.showResult();

    },

    // метод: заполнение введённых значений
    showResult: function () {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.floor(this.budgetDay);
      expensesMonthValue.value = +this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();

    },

    // метод: добавляет дополнительные поля "обязательных расходов", max = 3
    addExpensesBlock: function () {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }

    },

    // метод: добавляет дополнительные поля "дополнительных доходов", max = 3
    addIncomeBlock: function () {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
      }

    },

    // метод: передача значений "обязательных расходов"
    getExpenses: function () {
      expensesItems.forEach(function (item) {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && !isNumber(itemExpenses) && cashExpenses !== '' && isNumber(cashExpenses)) {
          this.expenses[itemExpenses] = cashExpenses;
        }
      }, this);

    },

    // метод: передача значений "дополнительных доходов"
    getIncomes: function () {
      incomeItems.forEach(function (item) {
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && !isNumber(itemIncome) && cashIncome !== '' && isNumber(cashIncome)) {
          this.incomes[itemIncome] = cashIncome;
        }
      }, this);

      // цикл: подсчёт суммы дополнительных доходов
      for (let key in this.incomes) {
        this.incomesMonth += +this.incomes[key];
      }

    },

    // метод: заполнение поля "возможные расходы"
    getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(', ');
      addExpenses.forEach(function (item) {
        item = item.trim();

        if (item !== '') {
          this.addExpenses.push(item);
        }
      }, this);

    },

    // метод: заполнение поля "возможные доходы"
    getAddIncomes: function () {
      additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();

        if (item.value !== '') {
          this.addIncome.push(itemValue);
        }
      }, this);

    },

    // метод: вычисление суммы всех обязательных расходов
    getExpensesMonth: function () {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }

    },

    // метод: вычисление месячного и дневного бюджетов
    getBudget: function () {
      this.budgetMonth = this.budget + this.incomesMonth - this.expensesMonth;
      this.budgetDay = this.budgetMonth / 30;

    },

    // метод: вычисление количества месяцев для достижения цели
    getTargetMonth: function () {
      if (this.budgetMonth < 0) {
        return 'Цель не будет достигнута';
      } else {
        return targetAmount.value / this.budgetMonth;
      }

    },

    // метод: оценка уровня дневного дохода
    getStatusIncome: function () {
      if (this.budgetDay < 0) {
        return ('Что то пошло не так!');
      } else if (this.budgetDay <= 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего...');
      } else if (this.budgetDay <= 1200) {
        return ('У вас средний уровень дохода.');
      } else {
        return ('У вас высокий уровень дохода!');
      }

    },

    // метод: определение достижения цели при отрицательном значении
    reachTargetCheck: function () {
      if (targetAmount.value < 0) {
        return ('Цель не будет достигнута');
      } else {
        return (`Цель будет достигнута за ${targetAmount.value} мес.`);
      }

    },

    // метод для указания % по вкладу и его сумме
    getInfoDeposit: function () {
      if (this.deposit) {
        do {
          this.percentDeposit = prompt('Какой годовой процент?', '10');

          if (!this.deposit) {
            break;
          } else if (!this.percentDeposit) {
            break;
          }
        }
        while (!isNumber(this.percentDeposit));

        if (this.percentDeposit) {
          do {
            this.moneyDeposit = prompt('Какая сумма заложена?', '10000');

            if (!this.moneyDeposit) {
              break;
            }
          }
          while (!isNumber(this.moneyDeposit));
        }
      }

    },

    // метод: посчёт накоплений
    calcPeriod: function () {
      return this.budgetMonth * this.setPeriod();

    },

    // метод: вывод "периода расчёта"
    setPeriod: function () {
      periodAmount.textContent = periodSelect.value;
      return periodAmount.textContent;

    },

    // метод: сброс данных по кнопке "сбросить"
    resetResults: function () {
      // отображение кнопки "рассчитать"
      start.style.display = 'block';
      // скрытие кнопки "сбросить"
      reset.style.display = 'none';
      // разблокировка полей для ввода
      document.querySelectorAll('input').forEach(function (item) {
        item.removeAttribute('disabled');
        item.value = '';

      });
      // разблокировка плюсов
      document.querySelectorAll('.btn_plus').forEach(function (item) {
        item.removeAttribute('disabled');

      });

      // очистка полей "дополнительные доходы" и "обязательные расходы"
      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove();
      }

      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove();
      }

      // устанавливаются начальные значения range
      periodSelect.value = '1';
      periodAmount.textContent = '1';

      // проверка на вводимое число в поле "месячный доход"
      startDisable();

      // обнуление значений
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.incomes= {};
      this.addIncome = [];
      this.incomesMonth = 0;
      this.expenses = {};
      this.addExpenses = [];
      this.expensesMonth = 0;
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.statusIncome = 0;

    }
  };

  // ОС "Калькулятора" - запуск программы по кнопке "Рассчитать"
  start.addEventListener('click', appData.start.bind(appData));
  // ОС "Обязательные расходы" - добавление дополнительных полей по нажатию на '+'
  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  // ОС "Дополнительные доходы" - добавление дополнительных полей по нажатию на '+'
  incomePlus.addEventListener('click', appData.addIncomeBlock);
  // ОС "Периода расчёта" - число меняется в соотвествии с движением ползунка
  periodSelect.addEventListener('input', appData.setPeriod);
  // ОС Запрет на нажатие кнопки "Рассчитать" при вводе не числа
  salaryAmount.addEventListener('input', startDisable);
  // ОС Блокировка на заполнение инпутов
  start.addEventListener('click', inputsDisable);
  // ОС "Калькулятора" - сбрасываются результаты расчётов
  reset.addEventListener('click', appData.resetResults);
  // ОС Динамическое изменение в поле "Накопления за период"
  periodSelect.addEventListener('input', (function () {
    incomePeriodValue.value = this.calcPeriod();
  }).bind(appData));

});