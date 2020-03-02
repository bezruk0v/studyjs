document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Таймер
    const countTimer = (deadline) => {
        // получаем элементы страницы
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        // определяем дедлайн и текущее время
        const getRemainingTime = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                remainingTime = (dateStop - dateNow) / 1000,
                seconds = Math.floor(remainingTime % 60),
                minutes = Math.floor((remainingTime / 60) % 60),
                hours = Math.floor(remainingTime / 60 / 60);
            // Если нужно добавить дни к таймеру:
            // hours = Math.floor((remainingTime / 60 / 60) % 24),
            // days = Math.floor(remainingTime / 60 / 60 / 24);
            // console.log(days);

            return {remainingTime, hours, minutes, seconds};
        };

        // форматирование таймера с добавлением нуля
        const twoDigits = (value) => {
            if (value < 10) {
                value = '0' + value;
            }
            return value;
        };

        // обновление таймера
        let intervalId;
        const clockUpdate = () => {
            let timer = getRemainingTime();
            timerHours.textContent = twoDigits(timer.hours);
            timerMinutes.textContent = twoDigits(timer.minutes);
            timerSeconds.textContent = twoDigits(timer.seconds);

            if (timer.remainingTime <= 0) {
                clearInterval(intervalId);
                timerHours.textContent = "--";
                timerMinutes.textContent = "--";
                timerSeconds.textContent = "--";
            }
        };
        intervalId = setInterval(clockUpdate, 1000);

        clockUpdate();
    };
    countTimer('07 march 2020 15:30:01');

    // меню
    const toggleMenu = () => {
        // кнопка меню
        const btnMenu = document.querySelector('.menu'),
            // блок меню
            menu = document.querySelector('menu');
        // btnClose = document.querySelector('.close-btn'),
        // menuItem = menu.querySelectorAll('ul>li');

        // октрытие/закрытие меню через переключение класса
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        // ОС кнопки "Меню"
        btnMenu.addEventListener('click', handlerMenu);
        // меню закрывается по нажатию на крестик или пункт меню (с помощью делигирования)
        menu.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.closest('a')) {
                handlerMenu();
            }
        });
    };
    toggleMenu();

    // меню (old)
    /*    const toggleMenu = () => {

            const btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu'),
                closeBtn = document.querySelector('.close-btn'),
                menuItems = menu.querySelectorAll('ul>li');
            let stepLeft = 0;

            const handlerMenu = () => {
                let animId;
                /!*!// вызов меню при помощи классов
                if(!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                    menu.style.transform = `translate(0)`;
                } else {
                    menu.style.transform = `translate(-100%)`;
                }*!/
                // вызов меню при помощи CSS
                // menu.classList.toggle('active-menu');

                // анимация
                let animate = () => {
                    animId = requestAnimationFrame(animate);
                    if (stepLeft < document.documentElement.clientWidth) {
                        stepLeft += 60;
                        menu.style.left = stepLeft + 'px';
                    }   else {
                        cancelAnimationFrame(animId);
                    }
                };

                // По клику запускает анимацию
                let clickMenu = () => {
                    if (!menu.style.left) {
                        animId = requestAnimationFrame(animate);
                    } else {
                        stepLeft = 0;
                        menu.removeAttribute('style');
                        cancelAnimationFrame(animId);
                    }
                };

                // Показывает меню при 768px
                let showMobileMenu = () => {
                    if (!menu.style.transform || menu.style.transform === 'translateX(-100%)') {
                        menu.style.transform = 'translateX(0)';
                    } else {
                        menu.style.transform = 'translateX(-100%)';

                    }
                };

                // Проверка расширения экрана
                let checkWidth = () => {
                    if (document.documentElement.clientWidth  > 768) {
                        clickMenu();
                    } else {
                        // cancelAnimationFrame(animId);
                        showMobileMenu();

                    }
                };
                checkWidth();

            };

            btnMenu.addEventListener('click', handlerMenu);
            closeBtn.addEventListener('click', handlerMenu);
            menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
        };
        toggleMenu();*/

    // pop-up окно
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpContent = document.querySelector('.popup-content');

        let count = -25,
            flyInterval;

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

        // параметры анивации попАпа
        const flyAnimate = () => {
            flyInterval = requestAnimationFrame(flyAnimate);
            count++;
            if (count * 30 < (screen.width / 2.6)) {
                popUpContent.style.left = count * 27 + 'px';
            } else {
                cancelAnimationFrame(flyInterval);
                count = -25;
            }
        };

        popUpBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popUp.style.display = `block`;
                if (screen.width >= 768) {
                    flyInterval = requestAnimationFrame(flyAnimate);
                }
            });
        });
    };
    togglePopUp();

    // Выезжающий PopUp
    const slidePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        let stepLeft = 0;

        const handlerPopUp = () => {
            let animId;
            let halfScreen = (document.documentElement.clientWidth * 0.5) - 191;

            // Анимация
            let animate = () => {
                animId = requestAnimationFrame(animate);
                if (stepLeft < (halfScreen)) {
                    stepLeft += 40;
                    popup.style.display = 'block';
                    popupContent.style.left = stepLeft + 'px';
                } else {
                    cancelAnimationFrame(animId);
                }
            };

            // По клику запускает анимацию
            let clickPopUp = () => {
                if (!popup.style.display) {
                    animId = requestAnimationFrame(animate);
                } else {
                    stepLeft = 0;
                    popup.removeAttribute('style');
                    popupContent.removeAttribute('style');
                    cancelAnimationFrame(animId);
                }
            };

            // Показывает меню при 768px
            let showMobilePopUp = () => {
                if (!popup.style.display || popup.style.display === 'none') {
                    popup.style.display = 'block';
                } else {
                    popup.style.display = 'none';

                }
            };

            // Проверка расширения экрана
            let checkWidth = () => {
                if (document.documentElement.clientWidth > 768) {
                    clickPopUp();
                } else {
                    // cancelAnimationFrame(animId);
                    showMobilePopUp();
                }
            };

            checkWidth();

        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', handlerPopUp);
        });

        popupClose.addEventListener('click', handlerPopUp);

    };
    slidePopUp();

    // Скрол по кнопке
    const scrolling = () => {
        const mainHeader = document.querySelector('main'),
            menu = document.querySelector('menu'),
            menuItem = menu.querySelectorAll('ul>li');

        const headerLinkScrollDown = mainHeader.lastElementChild;
        headerLinkScrollDown.addEventListener('click', (elem) => {
            elem.preventDefault();
            const getId = headerLinkScrollDown.getAttribute('href');

            document.querySelector(getId).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });

        for (let key of menuItem) {
            key.addEventListener('click', (elem) => {
                elem.preventDefault();
                const linkId = key.getAttribute('href');

                document.querySelector(linkId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    };
    scrolling();

    // Табы "Наши услуги"
    const tabs = () => {
        let tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            tabContent.forEach((item, i) => {
                if (index === i) {
                    tab[i].classList.add('active');
                    item.classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    item.classList.add('d-none');
                }
            });
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
            }
        });
    };
    tabs();

});