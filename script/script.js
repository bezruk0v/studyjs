'use strict';
document.addEventListener('DOMContentLoaded', () => {

      class First {
            constructor() {
            }
            hello1() {
                  console.log('Привет! Я метод родителя');
            }
      }

      class Second extends First {
            hello2() {
                  this.hello1();
                  console.log('А я наследуемый метод!');
            }
      }

      const second = new Second();

      second.hello2();

});