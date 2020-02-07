"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  let randNum = Math.floor(Math.random() * 100) + 1;
  console.log(randNum);
  let attempts = 10;

  const resultCheck = () => {
    if (attempts > 0) {
      let userNumber;
      do {
        userNumber = +prompt("Угадай число от 1 до 100");
      } while (!isNumber(userNumber));
      if (userNumber === randNum) {
        alert("Ура, вы угадали!");
        console.log(`Вы ввели число: ${userNumber}.` + " " + `Ура, вы угадали!`);
        // stop();
      } else if (userNumber < randNum) {
        attempts = attempts - 1;
        alert(`Загаданное число меньше! Осталость попыток: ${attempts}`);
        console.log(`Предыдущая попытка: ${userNumber}, осталость попыток: ${attempts}`);
        resultCheck();
      } else if (userNumber > randNum) {
        attempts = attempts - 1;
        alert(`Загаданное число больше! Осталость попыток: ${attempts}`);
        console.log(`Предыдущая попытка: ${userNumber}, осталость попыток: ${attempts}`);
        resultCheck();
      }
    }
  };
  resultCheck();
});