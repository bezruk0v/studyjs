'use strict';
// модальное окно ['Перезвоните мне']
const togglePopUp = () => {

    const popUp = document.querySelectorAll('.popup'),
        body = document.querySelector('body'),
        popUpCall = document.querySelector('.popup-call'),
        popUpDiscount = document.querySelector('.popup-discount'),
        popUpCheck = document.querySelector('.popup-check'),
        inputName = document.getElementsByName('user_name'),
        inputPhone = document.getElementsByName('user_phone');

    const blockEmptyInput = () => {
        inputName.forEach((elem) => {
            elem.setAttribute('required', '');
        });
        inputPhone.forEach((elem) => {
            elem.setAttribute('required', '');
        });
    };

    const removeAttributeRequired = () => {
        inputName.forEach((elem) => {
            elem.removeAttribute('required', '');
        });
        inputPhone.forEach((elem) => {
            elem.removeAttribute('required', '');
        });
    };

    const openPopup = (event) => {
        let target = event.target;

        if (target.classList.contains('call-btn')) {
            event.preventDefault();
            popUpCall.style.display = 'block';
            blockEmptyInput();
        }

        if (target.classList.contains('discount-btn')) {
            event.preventDefault();
            popUpDiscount.style.display = 'block';
            blockEmptyInput();
        }

        if (target.classList.contains('check-btn')) {
            event.preventDefault();
            popUpCheck.style.display = 'block';
            blockEmptyInput();
        }

        popUp.forEach((elem) => {
            elem.addEventListener('click', (event) => {
                let target = event.target;

                if (target.classList.contains('popup-close')) {
                    event.preventDefault();
                    removeAttributeRequired();
                    elem.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');

                    if (!target) {
                        event.preventDefault();
                        removeAttributeRequired();
                        elem.style.display = 'none';
                    }
                }
            });
        });
    };
    body.addEventListener('click', openPopup);
};

export default togglePopUp;