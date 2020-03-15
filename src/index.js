'use strict';

// импорт полифилов
/*import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';

elementClosest(window);*/

// импорт модулей
import togglePopUp from './modules/togglePopUp';
import sendForm from "./modules/formSender";
import inputValidation from "./modules/validator";
import accordion from "./modules/accordion";

// Вызов модального окна из header и footer
togglePopUp();
// Отправка форм 1 и 2
sendForm();
// Валидатор форм
inputValidation();
// Аккордеон 'Часто задаваемые вопросы'
accordion('accordion');
accordion('accordion-two');