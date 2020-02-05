'use strict';
document.addEventListener('DOMContentLoaded', () => {

let botData = {
    userNumber: +prompt('Угадай число от 1 до 100'),
    randNum: Math.floor(Math.random() * 100) + 1
};
    console.log(botData.randNum);

    const checkResult = () => {
        console.log(botData.userNumber);
        if (botData.userNumber === botData.randNum) {
            alert('Ура, вы угадали!');
        } else if (botData.userNumber < botData.randNum) {
            alert('Загаданное число меньше');
        } else if (botData.userNumber > botData.randNum) {
            alert('Загаданное число больше');
        }
    };
    checkResult();
});