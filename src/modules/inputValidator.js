const inputValidation = () => {
    // поделючение селектора body
    const body = document.querySelector('body'),
        // поделючение инпута почтового адреса
        inputEmail = document.getElementsByName('user_email');

    body.addEventListener('input', (event) => {
        let target = event.target;
        // валидация телефонного номера
        if (target.matches('input[name="user_phone"]')) {
            target.value = target.value.replace(/[^\+\d]/g, '');
            inputEmail.forEach((e) => {
                e.setAttribute('required', '');
            });
        }
        // валидация имени
        if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
            target.value = target.value.replace(/[^а-яА-Я,.!?"';: ]/, '');
        }
        // валидация почтового адреса
        if (target.matches('input[name="user_email"]')) {
            target.value = target.value.replace(/[^a-zA-Z@.(0-9)]/, '');
        }
    });

};

export default inputValidation;