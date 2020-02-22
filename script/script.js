'use strict';
document.addEventListener('DOMContentLoaded', () => {

      // Кнопка "Рассчитать"
  const start = document.getElementById('start'),
      // Кнопка "Сбросить"
      reset = document.getElementById('cancel'),
      // Кнопки через html tag
      btnPlus = document.getElementsByTagName('button'),
      // первый "+" - Дополнительные доходы
      incomePlus = btnPlus[0],
      // второй "+" - Обязательные расходы
      expensesPlus = btnPlus[1],
      // все плюсы
      allPluses = document.querySelectorAll('.btn_plus'),
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
      // поле ввода "Возможны расходы"
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      // определение всех полей ввода
      allInputsText = document.querySelectorAll('.data input[type = text]'),
      // определение всех полей вывода
      allInputsResult = document.querySelectorAll('.result input[type = text]'),
      // диапазон "Период расчета"
      periodSelect = document.querySelector('.period-select'),
      // значение "Периода расчета"
      periodAmount = document.querySelector('.period-amount'),
      // поле ввода "Цель"
      targetAmount = document.querySelector('.target-amount'),
      // кнопка чекбокса "Депозит"
      depositCheckBox = document.querySelector('#deposit-check'),
      // список банков
      depositBanksSelect = document.querySelector('.deposit-bank'),
      // сумма депозита
      depositAmount = document.querySelector('.deposit-amount'),
      // процент по депозиту
      depositPercent = document.querySelector('.deposit-percent');


      // поля "Дополнительных расходов"
  let incomeItems = document.querySelectorAll('.income-items'),
      // поля "Обязательные расходы"
      expensesItems = document.querySelectorAll('.expenses-items');

  /* функция проверки введенного значения на число isNumber, с помощью
   - parseFloat извлекаем число с плавающей запятой, а
   - isFinite определяем является ли значение конечным.*/
  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  class AppData {
    constructor() {
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.income = {};
      this.addIncome = [];
      this.incomesMonth = 0;
      this.expenses = {};
      this.addExpenses = [];
      this.expensesMonth = 0;
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
    }

    setFocus() {
      salaryAmount.focus();
    }

    // функция (): разблокировка кнопки Рассчитать, если указан Месячный доход
    checkEmptyAmount() {
      if (isNumber(salaryAmount.value) && salaryAmount.value > 0) {
        start.removeAttribute('disabled');
      }
      if (!isNumber(salaryAmount.value)) {
        start.setAttribute('disabled', 'true');
      }
    }

    checkDepositData() {
      if (isNumber(depositAmount.value) && depositAmount.value > 0) {
        start.removeAttribute('disabled');
      }
      if (!isNumber(depositAmount.value)) {
        start.setAttribute('disabled', 'true');
      }
    }

    checkDepositPercent() {
      if (isNumber(depositAmount.value) && depositAmount.value > 0) {
        if (isNumber(depositPercent.value) &&
            depositPercent.value >= 0 &&
            depositPercent.value <= 100) {
          start.removeAttribute('disabled');
        } else {
          alert('В поле "Процент" нужно указывать только число!');
          depositPercent.value = '';
          start.setAttribute('disabled', 'true');
        }
      } else {
        start.setAttribute('disabled', 'true');
      }
    }

    // функция (): заполнение формы данными + валидация/блоки инпутов
    startCalculator() {
      if (salaryAmount.value === '') {
        start.setAttribute('disabled', 'true');
        return;
      }

      /* Функция для блокировки полей заполнения */
      // блокировка всех инпутов
      const allInputs = document.querySelectorAll('.data input[type = text]');
      allInputs.forEach(function (item) {
        item.setAttribute('disabled', 'true');
      });

      // блокировка плюсов
      allPluses.forEach(function (elem) {
        elem.setAttribute('disabled', 'true');
      });

      this.setFocus();
      this.budget = +salaryAmount.value;

      this.getExpInc();
      this.getAddExpenses();
      this.getAddIncomes();
      this.getInfoDeposit();
      this.getBudget();
      this.getStatusIncome();
      this.showResult();

      // блокировка чекбокса депозита
      depositCheckBox.disabled = true;
      depositBanksSelect.disabled = true;

      // блокировка выбора периода расчетов
      // periodSelect.setAttribute('disabled', 'true');
      // скрытие кнопки "Рассчитать"
      start.style.display = 'none';
      // отображение кнопки "Сбросить"
      reset.style.display = 'block';
    }

    // метод: заполнение введённых значений
    showResult() {
      budgetMonthValue.value = this.budgetMonth; // Доход за месяц
      budgetDayValue.value = this.budgetDay; // Дневной бюджет
      expensesMonthValue.value = +this.expensesMonth; // Расход за месяц
      additionalIncomeValue.value = this.addIncome.join(', '); // Возможные доходы
      additionalExpensesValue.value = this.addExpenses.join(', '); // Возможные расходы
      incomePeriodValue.value = this.calcPeriod(); // Накопления за период
      targetMonthValue.value = this.getTargetMonth(); // Срок достижения цели
    }

    // метод: добавляет дополнительные поля "обязательных расходов", max = 3
    addExpensesBlock() {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }
    }

    // метод: добавляет дополнительные поля "дополнительных доходов", max = 3
    addIncomeBlock() {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
      }
    }

    // метод: вычисление суммы всех обязательных расходов и дополнительных доходов
    getExpInc() {
      const count = (item) => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== '' && !isNumber(itemTitle) && itemAmount !== '' && isNumber(itemAmount)) {
          this[startStr][itemTitle] = +itemAmount;
        }
      };

      incomeItems.forEach(count);
      expensesItems.forEach(count);

      // цикл: подсчёт суммы
      for (let key in this.income) {
        this.incomesMonth += +this.income[key];
      }
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
    }

    // метод: заполнение поля "возможные расходы"
    getAddExpenses() {
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
    }

    // метод: заполнение поля "возможные доходы"
    getAddIncomes() {
      additionalIncomeItem.forEach( (item) => {
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
    }

    // метод: вычисление месячного и дневного бюджетов
    getBudget() {
      const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
      this.budgetMonth = this.budget + this.incomesMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    // метод: вычисление количества месяцев для достижения цели
    getTargetMonth() {
      if (this.budgetMonth <= 0) {
        return 'Цель не будет достигнута';
      } else {
        return Math.ceil(targetAmount.value / this.budgetMonth);
      }
    }

    // метод: оценка уровня дневного дохода
    getStatusIncome() {
      if (this.budgetDay < 0) {
        return ('Что то пошло не так!');
      } else if (this.budgetDay <= 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего...');
      } else if (this.budgetDay <= 1200) {
        return ('У вас средний уровень дохода.');
      } else {
        return ('У вас высокий уровень дохода!');
      }
    }

    // метод: определение достижения цели при отрицательном значении
    reachTargetCheck() {
      if (targetAmount.value < 0) {
        return ('Цель не будет достигнута');
      } else {
        return (`Цель будет достигнута за ${targetAmount.value} мес.`);
      }
    }

    // метод: посчёт накоплений
    calcPeriod() {
      return this.budgetMonth * this.setPeriod();
    }

    // метод: вывод "периода расчёта"
    setPeriod() {
      periodAmount.textContent = periodSelect.value;
      return periodAmount.textContent;
    }

    // метод: сброс данных по кнопке "сбросить"
    resetResults() {
      // разблокировка полей для ввода и установка начального значения range
      allInputsText.forEach( (elem) => {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
      });
      // очистка значений полей для вывода
      allInputsResult.forEach( (elem) => {
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
      this.income = {};
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
      allPluses.forEach( (elem) => {
        elem.removeAttribute('disabled');
      });

      // разблокировка чекбокса, снимается выбор, скрытие и обнуление значений инпутов
      depositCheckBox.disabled = false;
      depositCheckBox.checked = false;
      depositBanksSelect.style.display = defaultStatus;
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBanksSelect.value = '';
      depositAmount.value = '';
      depositBanksSelect.disabled = false;

      this.setFocus();
    }

    // метод для указания % по вкладу и его сумме
    getInfoDeposit() {
      if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        if (isNumber(depositAmount.value)) {
          this.moneyDeposit = depositAmount.value;
        }
      }
    }

    changePercent() {
      const selectBankValue = this.value;
      if (selectBankValue === 'other') {
        depositPercent.style.display = 'inline-block';
        depositPercent.value = '';
      } else {
        depositPercent.value = selectBankValue;
        depositPercent.style.display = 'none';
      }
    }

    depositHandler() {
      if (depositCheckBox.checked) {
        depositBanksSelect.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBanksSelect.addEventListener('change', this.changePercent);
      } else {
        depositBanksSelect.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBanksSelect.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBanksSelect.removeEventListener('change', this.changePercent);
      }
    }

    eventsListeners() {
      // ОС "Калькулятора" - запуск программы по кнопке "Рассчитать"
      start.addEventListener('click', this.startCalculator.bind(this));
      // ОС "Обязательные расходы" - добавление дополнительных полей по нажатию на '+'
      expensesPlus.addEventListener('click', this.addExpensesBlock);
      // ОС "Дополнительные доходы" - добавление дополнительных полей по нажатию на '+'
      incomePlus.addEventListener('click', this.addIncomeBlock);
      // ОС проверка заполнения обязательного поля "Месяный доход"
      salaryAmount.addEventListener('keyup', this.checkEmptyAmount);
      // ОС проверка правильности заполнения суммы депозита
      depositAmount.addEventListener('input', this.checkDepositData);
      // ОС проверка правильности заполнения процента по депозиту
      depositPercent.addEventListener('input', this.checkDepositPercent);
      // ОС "Периода расчёта" - число меняется в соотвествии с движением ползунка
      periodSelect.addEventListener('input', this.setPeriod);
      // ОС Динамическое изменение в поле "Накопления за период"
      periodSelect.addEventListener('change', () => {
        periodAmount.innerHTML = periodSelect.value;
      });
      // ОС Динамическое изменение в поле "Накопления за период"
      periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcPeriod();
      });
      // ОС "Калькулятора" - сбрасываются результаты расчётов
      reset.addEventListener('click', this.resetResults.bind(this));

      // ОС Депозит - вывод списка банков
      depositCheckBox.addEventListener('change', this.depositHandler.bind(this));
    }
  }

    const appData = new AppData ();

    appData.eventsListeners();

});