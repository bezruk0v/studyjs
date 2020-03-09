const slidePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popUpContent = document.querySelector('.popup-content'),
        popUpBtn = document.querySelectorAll('.popup-btn');
    let stepLeft = 0,
        animId,
        halfScreen = (document.documentElement.clientWidth * 0.5) - 191;

    const handlerPopUp = () => {
        // закрывет модальное окно по нажатию вне его границ
        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = `none`;
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = `none`;
                }
            }
        });

        // анимация - по клику вылетает окно слева
        let popUpAnimation = () => {
            animId = requestAnimationFrame(popUpAnimation);
            popUp.style.display = 'block';
            stepLeft++;
            if (stepLeft < (halfScreen)) {
                stepLeft += 40;
                popUpContent.style.left = stepLeft + 'px';
            } else {
                cancelAnimationFrame(animId);
            }
        };

        // Показывает меню при 768px
        let showMobilePopUp = () => {
            if (!popUp.style.display || popUp.style.display === 'none') {
                popUp.style.display = 'block';
            } else {
                popUp.style.display = 'none';
            }
        };

        // Проверка расширения экрана
        let checkWidth = () => {
            if (document.documentElement.clientWidth > 768) {
                popUpAnimation();
            } else {
                showMobilePopUp();
            }
        };
        checkWidth();
    };

    popUpBtn.forEach((elem) => {
        elem.addEventListener('click', handlerPopUp);
    });
};

export default slidePopUp;