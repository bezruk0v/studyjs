'use strict';

import togglePopUp from './togglePopUp';
import sendForm from './formSender';

//калькулятор
const calculator = () => {
    //получаем необходимые элементы
    const accordion = document.getElementById('accordion'),
        onoffswitchLabel = document.querySelectorAll('.onoffswitch-label'),
        checkBox = document.querySelectorAll('.onoffswitch-checkbox'),
        secondSection = document.getElementById('second-section'),
        formControl = document.querySelectorAll('.form-control'),
        inputText = accordion.querySelector('input[type="text"]'),
        calcResult = document.getElementById('calc-result');

    const countSum = () => {
        let total = 10000;

        const obj = {
            firstDiameter: formControl[0].options[formControl[0].selectedIndex].textContent,
            firstAmount: formControl[1].options[formControl[1].selectedIndex].textContent,
            secondDiameter: formControl[2].options[formControl[2].selectedIndex].textContent,
            secondAmount: formControl[3].options[formControl[3].selectedIndex].textContent
        };

        if (checkBox[0].checked) {
            if (obj.firstDiameter === '2 метра') {
                total *= 1.2;
            }
            if (obj.firstAmount === '2 штуки') {
                total *= 1.3;
            } else if (obj.firstAmount === '3 штуки') {
                total *= 1.5;
            }
            if (checkBox[1].checked) {
                total += 1000;
            }
        } else {
            total = 15000;

            if (obj.firstDiameter === '2 метра') {
                total *= 1.2;
            }
            if (obj.firstAmount === '2 штуки') {
                total *= 1.3;
            } else if (obj.firstAmount === '3 штуки') {
                total *= 1.5;
            }
            if (obj.secondDiameter === '2 метра') {
                total *= 1.2;
            }
            if (obj.secondAmount === '2 штуки') {
                total *= 1.3;
            } else if (obj.secondAmount === '3 штуки') {
                total *= 1.5;
            }
            if (checkBox[1].checked) {
                total += 2000;
            }
        }
        calcResult.value = total;
    };

    const createObj = () => {
        const type = () => {
            if (checkBox[0].hasAttribute('checked')) {
                return 'однокамерный';
            } else {
                return 'двухкамерный';
            }
        };

        const dno = () => {
            if (checkBox[1].hasAttribute('checked')) {
                return 'с днищем';
            } else {
                return 'без днища';
            }
        };

        const data = {
            'Тип септика': type(),
            'Диаметр первого колодца': formControl[0].options[formControl[0].selectedIndex].textContent,
            'Количество колец первого колодца': formControl[1].options[formControl[1].selectedIndex].textContent,
            'Диаметр второго колодца': formControl[2].options[formControl[2].selectedIndex].textContent,
            'Количество колец второго колодца': formControl[3].options[formControl[3].selectedIndex].textContent,
            'Наличие днища колодца': dno(),
            'Расстояние от септика до дома': inputText.value,
            'Примерная стоимость': calcResult.value
        };
        return data;
    };

    accordion.addEventListener('click', (event) => {
        const target = event.target;

        onoffswitchLabel.forEach((item, i) => {
            if (item === target.closest('.onoffswitch-label')) {
                if (checkBox[i].checked) {
                    checkBox[i].removeAttribute('checked');
                } else {
                    checkBox[i].setAttribute('checked', true);
                }
            }
            if (!checkBox[0].checked) {
                secondSection.style.display = 'block';
            } else {
                secondSection.style.display = 'none';
            }
        });
        countSum();
    });

    togglePopUp('.popup-discount', 'button.call-btn');
    const asd = document.querySelector('button.call-btn');
    asd.addEventListener('mousedown', () => {
        let obj = createObj();
        sendForm('.capture-form-calc', obj);
    });
};

export default calculator;