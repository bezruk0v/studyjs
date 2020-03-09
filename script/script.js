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
    countTimer('07 march 2021 14:05:00');

    // меню
    const toggleMenu = () => {
        // блок меню
        const menu = document.querySelector('menu');
        // октрытие/закрытие меню через переключение класса
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        // ОС для "Меню"
        document.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('.menu')) {
                handlerMenu();
            } else if (target.closest('.active-menu') && !target.classList.contains('active-menu')) {
                handlerMenu();
            } else {
                target = target.closest('.active-menu');
                if (menu.classList.contains('active-menu') && !target) {
                    handlerMenu();
                }
            }
        });
    };
    toggleMenu();

    // pop-up окно слайдер
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
    slidePopUp();

    // скрол по кнопке
    /*    const scrolling = () => {
            const menuItem = document.querySelectorAll('[href^="#"]'),
                duration = 0.4;

            menuItem.forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    let win = window.pageYOffset,
                        hash = item.href.replace(/[^#]*(.+)/, '$1'),
                        windowOffset = document.querySelector(hash).getBoundingClientRect().top,
                        start = null;
                    const step = (time) => {
                        if (start === null) {
                            start = time;
                        }
                        let progress = time - start,
                            temp = (windowOffset < 0 ? Math.max(win - progress / duration, win + windowOffset) :
                                Math.min(win + progress / duration, win + windowOffset));
                        window.scrollTo(0, temp);
                        if (temp !== win + windowOffset) {
                            requestAnimationFrame(step);
                        } else {
                            location.hash = hash;
                        }
                    };
                    requestAnimationFrame(step);
                }, false);
            });

        };
        scrolling();*/

    // табы "Наши услуги"
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
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

    // слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        // добавление точек на слайдер
        let dotItem;
        const getDots = () => {
            for (let i = 0; i < slide.length; i++) {
                dotItem = document.createElement('li');
                dotItem.classList.add('dot');
                dots.append(dotItem);
            }
            dots.childNodes[1].classList.add('dot-active');

        };
        getDots();

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlider = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const startSlider = (time = 3000) => {
            interval = setInterval(autoPlaySlider, time);
        };
        const stopSlider = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlider();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlider();
            }
        });
        startSlider(2000);
    };
    slider();

    // замена фотографий при наведении в блоке "Наша команда"
    const photoReplace = () => {
        // получение фотографий
        const commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach((item) => {
            // получение ссылки на фото
            let currentPhoto = item.src;
            // ОС: замена фото при наведении
            item.addEventListener('mouseenter', (event) => {
                event.target.src = event.target.dataset.img;
            });
            // ОС: возвращение фото по умолчанию при снятии наведения
            item.addEventListener('mouseout', (event) => {
                event.target.src = currentPhoto;
            });
        });
    };
    photoReplace();

    // валидация полей калькулятора
    const calcValidation = () => {
        const calcItem = document.querySelectorAll('.calc-item');
        // перебор элементов и разрешение ввода только цифр
        calcItem.forEach((item) => {
            if (!item.classList.contains('calc-type')) {
                item.addEventListener('input', (event) => {
                    let target = event.target;
                    target.textContent = target.toString().replace(/[^0-9]/);
                });
            }
        });
    };
    calcValidation();

    // калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcRooms = document.querySelector('.calc-count'),
            calcTotal = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                roomsValue = 1,
                daysValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcRooms.value > 1) {
                roomsValue += (calcRooms.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                daysValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                daysValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * roomsValue * daysValue;
            } else {
                total = 0;
            }

            calcTotal.textContent = Math.floor(total);
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            /*if (target.matches('.calc-type') || target.matches('.calc-square') ||
                target.matches('.calc-day') || target.matches('.calc-count')) {
                console.log(1);
            }*/
            /*if (target === calcType || target === calcSquare ||
                target === calcDay || target === calcRooms) {
                console.log(1);
            }*/
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100);

    // send-ajax-form
    const sendForm = () => {
        // сообщения статусов
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся!',
            // подлючение к формам обращений
            form = document.querySelectorAll('form'),
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

        form.forEach((element) => {
            // отмена перезагрузки страницы
            element.addEventListener('submit', (event) => {
                event.preventDefault();
                // добавление элемента
                element.appendChild(statusMessage);
                // добавление сообщения о начале загрузки
                statusMessage.textContent = loadMessage;
                // создание объекта FormData для сбора всех данных с формы
                const formData = new FormData(element);
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
    sendForm();

    // валидация данных
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
    inputValidation();

});