'use strict';

// иморт полифилов
import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise/auto';
import 'fetch-polyfill';

// ипорт модулей
import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import slidePopUp from "./modules/slidePopUp";
import scrolling from "./modules/scrolling";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import photoReplace from "./modules/photoReplacer";
import calcValidation from "./modules/calcValidation";
import calc from "./modules/calculator";
import sendForm from "./modules/formSender";
import inputValidation from "./modules/inputValidator";

// Таймер
countTimer('07 march 2021 14:05:00');
// меню
toggleMenu();
// pop-up окно слайдер
slidePopUp();
// скрол по кнопке
scrolling();
// табы "Наши услуги"
tabs();
// слайдер
slider();
// замена фотографий при наведении в блоке "Наша команда"
photoReplace();
// валидация полей калькулятора
calcValidation();
// калькулятор
calc(100);
// send-ajax-form
sendForm();
// валидация данных
inputValidation();