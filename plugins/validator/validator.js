class Validator {

    // создание конструктора
    constructor({selector, pattern = {}, method}) {
        // подключение формы
        this.form = document.querySelector(selector);
        // кастомные шаблоны, которые можно добавлять не трогая код валидатора
        this.pattern = pattern;
        // метод отпределяет какие поля валидируются и что к ним применяется
        this.method = method;
        // фильтрация кнопок с тэгом или типом button
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        // ошибки
        this.error = new Set();
    }

    // метод запускающий валидатор
    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        // кнопка не сработает
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            // если поля ввода пустые
            this.elementsForm.forEach(elem => this.checkIt({target: elem}));
            // значения полей не прошли валидацию
            if (this.error.size) {
                e.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };

        // передаётся ли какой-нибудь метод
        if (this.method) {
            // какой метод был передан
            const method = this.method[elem.id];

            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
        }

        return true;
    }

    checkIt(event) {
        const target = event.target;
        // если валидация пройдена, вызывается функция showSuccess, иначе showError
        if (this.isValid(target)) {
            this.showSuccess(target);
            // удаляется ошибка
            this.error.delete(target);
        } else {
            this.showError(target);
            // добавляется ошибка
            this.error.add(target);
        }
    }

    // error, если значения input не прошли валидацию
    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        // если класс validator-error уже есть
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        // определение текста с ошибкой
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        // добавление текста с ошибкой после элемента div
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    //  success, если значения input прошли валидацию
    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        // проверка на наличие у элемента чего-то(?) справа
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    // подключение CSS стилей для валидации
    applyStyle() {
        // создается элемент
        const style = document.createElement('style');
        style.textContent = `
      input.success {
        background-color: #B1D17F;
      }
      input.error {
        background-color: #CC7D93;
      }
      .validator-error {
        color: #CC7D93;
        font-family: sans-serif !important;
        font-size: 13px !important;
      }
    `;
        // вставиляется в head
        document.head.appendChild(style);
    }

    // проверка паттернов
    setPattern() {
        if (!this.pattern.phone) {
            // паттерн телефона по умолчанию
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        if (!this.pattern.email) {
            // паттерн email по умолчанию
            this.pattern.email = /^\w+\.\w+@\w+\.\w{2,}$/;
        }
        if (!this.pattern.name) {
            // паттерн имени: всё кроме латиницы, цифр и пробела
            this.pattern.name = /^[а-яА-Я\s]*$/;
        }
        if (!this.pattern.message) {
            // паттерн сообщения: Всё кроме латиницы, цифр и пробела
            this.pattern.message = /^[а-яА-Я\s]*$/;
        }

    }
}