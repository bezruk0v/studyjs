'use strict';

// импорт полифилов
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';

elementClosest(window);

// импорт модулей
import togglePopUp from "./modules/togglePopUp";

togglePopUp();