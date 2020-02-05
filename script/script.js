'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const checkResult = () => {
        let randNum = Math.floor(Math.random() * 100) + 1;
        console.log(randNum);

        const userNumber = +prompt('Угадай число от 1 до 100');
        console.log(userNumber);
        if (userNumber === randNum) {
            alert('Ура, вы угадали!');
            confirm('Повторишь?');
        } else if (userNumber < randNum) {
            alert('Загаданное число меньше');
            checkResult();
        } else if (userNumber > randNum) {
            alert('Загаданное число больше');
            checkResult();
        }
    };
    checkResult();
});