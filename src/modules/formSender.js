'use strict';

// функция отправки формы
const sendForm = (className, obj) => {
    // создаем сообщения
    const errorMessage = 'Ошибка...',
        loadMessage = 'Отправка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    // получаем форму
    const form = document.querySelector(className);
    // создаём элемент, который будем добавлять на страницу
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem;
                                    color: red;`;

    // функция запроса на сервер
    const postData = (body) => {
        // fetch
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    form.addEventListener('submit', (event) => {
        // отменяем стандартное поведение, для отмены перезагрузки страницы
        event.preventDefault();
        // добавляем элемент
        form.appendChild(statusMessage);
        // добавляем сообщение о начале загрузки
        statusMessage.textContent = loadMessage;
        // создаем объект FormData, считывающий все данные с формы и имеющий аттрибут name
        const formData = new FormData(form);
        // записываем данные в объект
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        // при необходимости соединяем объекты в один
        Object.assign(body, obj);
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                form.reset();
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
                form.reset();
            })
            .finally(() => {
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            });
    });

    // получаем все инпуты формы + валиадация
    const body = document.querySelector('body'),
        inputName = document.getElementsByName('user_name'),
        inputPhone = document.getElementsByName('user_phone');

    body.addEventListener('input', (event) => {
        let target = event.target;
        if (target.matches('input[name="user_phone"]')) {
            target.value = target.value.replace(/[^+\d]/, '');
            target.value = target.value.replace(/^\+{2,}/, '');
            target.value = target.value.replace(/(?<=[0-9])\+/, '');
            target.value = target.value.replace(/.{13}/, '');
            target.value = target.value.replace(/^[0-9]/, '');
            inputName.forEach((elem) => {
                elem.setAttribute('required', '');
            });
        }
        if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
            target.value = target.value.replace(/[^а-яА-Я]/, '');
        }
        if (target.matches('input[name="user_email"]')) {
            target.value = target.value.replace(/[^a-zA-Z@.(0-9)]/, '');
        }
    });

    inputName.forEach(elem => {
        elem.oncut = elem.oncopy = elem.onpaste = () => {
            return false;
        };
    });

    inputPhone.forEach(elem => {
        elem.oncut = elem.oncopy = elem.onpaste = () => {
            return false;
        };
    });
};

export default sendForm;