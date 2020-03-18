'use strict';

// импорт полифилов
/*import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);*/

// импорт модулей
import togglePopUp from './modules/togglePopUp';
import sendForm from './modules/formSender';
import tabs from './modules/accordion';
import calculator from './modules/calculator';
import sentenceBtn from './modules/moreButton';
import sendQuestion from './modules/sendQuestion';

// функция открытия/закрытия модального окна при нажатии на "Перезвоните мне"
togglePopUp('.popup-call', 'a[class="call-btn"]');
sendForm('.capture-form-call');

// функция открытия/закрытия модального окна при нажатии на "Заказать со скидкой" и "Узнать цену со скидкой"
togglePopUp('.popup-discount', '.discount-btn');

// функция открытия/закрытия модального окна при нажатии на "Получить чек-лист и скидку"
togglePopUp('.popup-check', '.check-btn');
sendForm('.capture-form-check');

// отправление формы
sendForm('.capture-form');
sendForm('.main-form');

// работа аккордионов
tabs('accordion');
tabs('accordion-two');

// калькулятор
calculator();

// открытие блоков при нажатии на "Больше..."
sentenceBtn();

// отправка модального окна с вопросом
sendQuestion();