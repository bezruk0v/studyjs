// модальное окно ['Перезвоните мне']
const togglePopUp = () => {
    // подключаем элементы
    const callBtn = document.querySelectorAll('a[class="call-btn"]'),
        popUpCall = document.querySelector('.popup-call');

    // ОС: открытие модального окна ['Перезвоните мне']
    callBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popUpCall.style.display = 'block';
        });
    });

    // ОС: закрытие модального окна при клике на крестик и вне окна
    popUpCall.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popUpCall.style.display = 'none';
        } else {
            target = target.closest('.popup-content');

            if (!target) {
                popUpCall.style.display = 'none';
            }
        }
    });
};

export default togglePopUp;