'use strict';

const inputValidation = () => {
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

    inputName.forEach(element => {
        element.oncut = element.oncopy = element.onpaste = function () {
            return false;
        };
    });

    inputPhone.forEach(element => {
        element.oncut = element.oncopy = element.onpaste = function () {
            return false;
        };
    });
};

export default inputValidation;