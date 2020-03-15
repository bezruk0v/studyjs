'use strict';

// функция отправки формы
const sendForm = () => {
    const loadMessage = 'Отправка...',
        successMessage = 'Отправлено',
        errorMessage = 'Ошибка',
        form = document.querySelectorAll('form'),
        statusMessage = document.createElement('div');
    let timeoutId;

    statusMessage.style.cssText = 'font-style: italic;';

    form.forEach((elem) => {

        if (elem.classList.contains('main-form') || elem.classList.contains('other-form')) {
            elem.addEventListener('submit', (event) => {
                event.preventDefault();
                elem.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(elem);
                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                const postData = (body) => {
                    return fetch('./server.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
                };

                postData(body)
                    .then((response) => {
                        if (response.status === 200) {
                            throw new Error('status network not 200');
                        }

                        statusMessage.style.cssText = 'color: green; font-weight: 700; letter-spacing: 5px;';
                        statusMessage.textContent = successMessage;

                        timeoutId = setTimeout(() => {
                            form.forEach((elem) => {
                                elem.querySelectorAll('input').forEach((index) => {
                                    index.value = '';
                                });
                            });

                            statusMessage.textContent = '';
                        }, 3000);

                    })

                    .catch((error) => {
                        statusMessage.style.cssText = 'color: red;';
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
            });
        }
    });
};

export default sendForm;