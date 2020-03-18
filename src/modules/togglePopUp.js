'use strict';

// функция для открытия и закрытия модальных окон
const togglePopUp = (popUpClass, btnClass) => {
    // получаем необходимые элементы
    const btn = document.querySelectorAll(btnClass),
        popUp = document.querySelector(popUpClass);

    // ОС - открытие модального окна при клике на "Перезвоните мне" в хедере и футере
    btn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popUp.style.display = 'block';
        });
    });

    // ОС - закрытие модального окна при клике на крестик или на подложку
    popUp.addEventListener('click', (event) => {
        let target = event.target;
        // закрытие по крестику
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            // закрытие по клику вне модалбного окна
            target = target.closest('.popup-content');

            if (!target) {
                popUp.style.display = 'none';
            }
        }
    });
};

export default togglePopUp;