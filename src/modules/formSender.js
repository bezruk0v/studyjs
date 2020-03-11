const sendForm = () => {
    // сообщения статусов
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!',
        // подлючение к формам обращений
        forms = document.querySelectorAll('form'),
        // создание элемента для вывода сообщений статусов
        statusMessage = document.createElement('div');
    // форматирование текста сообщения
    statusMessage.style.cssText = 'font-size: 1.5rem; color: #fff';

    // фунция запроса на сервер
    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    forms.forEach((form) => {
        // отмена перезагрузки страницы
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // добавление элемента
            form.appendChild(statusMessage);
            // добавление сообщения о начале загрузки
            statusMessage.textContent = loadMessage;
            // создание объекта FormData для сбора всех данных с формы
            const formData = new FormData(form);
            // запись данных в объект
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });

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
                })
                .finally(() => {
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                });

        });
    });
};

export default sendForm;