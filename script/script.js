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
      depositCheckBox = document.querySelector('#deposit-check'),
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
      // определение всех полей ввода
      allInputsText = document.querySelectorAll('.data input[type = text]'),
      // определение всех полей вывода
      allInputsResult = document.querySelectorAll('.result input[type = text]'),
      // все плюсы
      allPluses = document.querySelectorAll('.btn_plus');


  /* функция проверки введенного значения на число isNumber, с помощью
  - parseFloat извлекаем число с плавающей запятой, а
  - isFinite определяем является ли значение конечным.*/
  const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomes = {};
    this.addIncome = [];
    this.incomesMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  };

  // функция (): разблокировка кнопки Рассчитать, если указан Месячный доход
  AppData.prototype.check = function () {
    if (isNumber(salaryAmount.value) && salaryAmount.value > 0) {
      start.removeAttribute('disabled');
    }
    if (!isNumber(salaryAmount.value)) {
      start.setAttribute('disabled', 'true');
      salaryAmount.placeholder = "Введите число";
    }
  };

  // функция (): заполнение формы данными + валидация/блоки инпутов
  AppData.prototype.start = function () {
    if (salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
      return;
    }

    /* Функция для блокировки полей заполнения */
    // блокировка всех инпутов
    let allInputs = document.querySelectorAll('.data input[type = text]');
    allInputs.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });

    // блокировка плюсов
    allPluses.forEach(function (elem) {
      elem.setAttribute('disabled', 'true');
    });

      this.budget = +salaryAmount.value;

      this.getIncomes();
      this.getExpenses();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncomes();
      this.getBudget();
      this.getInfoDeposit();
      this.getStatusIncome();
      this.showResult();

    // блокировка чекбокса депозита
    depositCheckBox.disabled = true;

    // блокировка выбора периода расчетов
    // periodSelect.setAttribute('disabled', 'true');
    // скрытие кнопки "Рассчитать"
    start.style.display = 'none';
    // отображение кнопки "Сбросить"
    reset.style.display = 'block';
  };

  // метод: заполнение введённых значений
  AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth; // Доход за месяц
    budgetDayValue.value = this.budgetDay; // Дневной бюджет
    expensesMonthValue.value = +this.expensesMonth; // Расход за месяц
    additionalIncomeValue.value = this.addIncome.join(', '); // Возможные доходы
    additionalExpensesValue.value = this.addExpenses.join(', '); // Возможные расходы
    incomePeriodValue.value = this.calcPeriod(); // Накопления за период
    targetMonthValue.value = this.getTargetMonth(); // Срок достижения цели
  };

  // метод: добавляет дополнительные поля "обязательных расходов", max = 3
  AppData.prototype.addExpensesBlock = function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  };

  // метод: добавляет дополнительные поля "дополнительных доходов", max = 3
  AppData.prototype.addIncomeBlock = function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  };

  // метод: передача значений "обязательных расходов"
  AppData.prototype.getExpenses = function () {
    expensesItems.forEach(function (item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && !isNumber(itemExpenses) && cashExpenses !== '' && isNumber(cashExpenses)) {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);
  };

  // метод: вычисление суммы всех обязательных расходов
  AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  };

  // метод: передача значений "дополнительных доходов"
  AppData.prototype.getIncomes = function () {
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
  };

  // метод: заполнение поля "возможные расходы"
  AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();

      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
    // цикл: приводит значения из "обязательные расходы" в "Обязательные расходы"
    for (let i = 0; i < this.addExpenses.length; i++) {
      if (this.addExpenses[i]) {
        this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].substring(1);
      } else {
        this.addExpenses = [];
      }
    }
  };

  // метод: заполнение поля "возможные доходы"
  AppData.prototype.getAddIncomes = function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();

      if (item.value !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
    // цикл: приводит значения из "возможный доход" в "Возможный доход"
    for (let i = 0; i < this.addIncome.length; i++) {
      if (this.addIncome[i]) {
        this.addIncome[i] = this.addIncome[i][0].toUpperCase() + this.addIncome[i].substring(1);
      } else {
        this.addIncome = [];
      }
    }
  };

  // метод: вычисление месячного и дневного бюджетов
  AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomesMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };

  // метод: вычисление количества месяцев для достижения цели
  AppData.prototype.getTargetMonth = function () {
    if (this.budgetMonth <= 0) {
      return 'Цель не будет достигнута';
    } else {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }
  };

  // метод: оценка уровня дневного дохода
  AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay < 0) {
      return ('Что то пошло не так!');
    } else if (this.budgetDay <= 600) {
      return ('К сожалению, у вас уровень дохода ниже среднего...');
    } else if (this.budgetDay <= 1200) {
      return ('У вас средний уровень дохода.');
    } else {
      return ('У вас высокий уровень дохода!');
    }
  };

  // метод: определение достижения цели при отрицательном значении
  AppData.prototype.reachTargetCheck = function () {
    if (targetAmount.value < 0) {
      return ('Цель не будет достигнута');
    } else {
      return (`Цель будет достигнута за ${targetAmount.value} мес.`);
    }
  };

  // метод для указания % по вкладу и его сумме
  AppData.prototype.getInfoDeposit = function () {
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
  };

  // метод: посчёт накоплений
  AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * this.setPeriod();
  };

  // метод: вывод "периода расчёта"
  AppData.prototype.setPeriod = function () {
    periodAmount.textContent = periodSelect.value;
    return periodAmount.textContent;
  };

  // метод: сброс данных по кнопке "сбросить"
  AppData.prototype.resetResults = function () {
    // разблокировка полей для ввода и установка начального значения range
    allInputsText.forEach(function (elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    // очистка значений полей для вывода
    allInputsResult.forEach(function (elem) {
      elem.value = '';
    });

    // очистка полей "дополнительные доходы" и "обязательные расходы"
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    }

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

    // скрытие кнопки "сбросить"
    reset.style.display = 'none';
    // отображение кнопки "рассчитать"
    start.style.display = 'block';

    // разблокировка плюсов
    allPluses.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });

    // разблокировка чекбокса и снимается выбор
    depositCheckBox.disabled = false;
    depositCheckBox.checked = false;
  };

  AppData.prototype.eventsListeners = function () {
    // ОС "Калькулятора" - запуск программы по кнопке "Рассчитать"
    start.addEventListener('click', this.start.bind(this));
    // ОС "Обязательные расходы" - добавление дополнительных полей по нажатию на '+'
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    // ОС "Дополнительные доходы" - добавление дополнительных полей по нажатию на '+'
    incomePlus.addEventListener('click', this.addIncomeBlock);
    // ОС проверка заполнения обязательного поля "Месяный доход"
    salaryAmount.addEventListener('keyup', this.check);
    // ОС "Периода расчёта" - число меняется в соотвествии с движением ползунка
    periodSelect.addEventListener('input', this.setPeriod);
    // ОС Динамическое изменение в поле "Накопления за период"
    periodSelect.addEventListener('change', function () {
      periodAmount.innerHTML = periodSelect.value;
    });
    // ОС Динамическое изменение в поле "Накопления за период"
    const _this = this;
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = _this.calcPeriod();
    });
    // ОС "Калькулятора" - сбрасываются результаты расчётов
    reset.addEventListener('click', this.resetResults.bind(this));
  };

  const appData = new AppData ();

  appData.eventsListeners();

});