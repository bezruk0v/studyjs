document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // получаем данные страницы
    const body = document.querySelector('body');
    const createNewItem = (text, id) => {
        let newItem = document.createElement('p');
        newItem.setAttribute('id', id);
        newItem.textContent = text;
        body.appendChild(newItem);
    };

    // функция склонения
    const declOfNum = (number, titles) => number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ?
        2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

    // форматирование таймера с добавлением нуля
    const twoDigits = (value) => {
        if (value < 10) {
            value = '0' + value;
        }
        return value;
    };

    let currentDate = new Date();

    // приветствие
    const getGreeting = () => {
        let greeting = "Добрый ";
        if (currentDate.getHours() >= 6 && currentDate.getHours() < 12) {
            greeting = 'Доброе утро!';
        } else if (currentDate.getHours() >= 12 && currentDate.getHours() < 17) {
            greeting = greeting + ' ' + 'день!';
        } else if (currentDate.getHours() >= 17 && currentDate.getHours() < 23) {
            greeting = greeting + ' ' + 'вечер!';
        } else {
            greeting = 'Доброй ночи!';
        }
        return greeting;
    };

    // массив дней недели
    const currentDay = () => {
        let weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return weekDays[(currentDate.getDay())];
    };

    // текущее время в 'en' формате
    const getCurrentTime = () => {
        let currentTime = twoDigits(currentDate.getHours() % 12) + ':' +
            twoDigits(currentDate.getMinutes()) + ':' +
            twoDigits(currentDate.getSeconds());
        if (currentDate.getHours() >= 12) {
            currentTime = currentTime + ' ' + 'PM';
        } else {
            currentTime = currentTime + ' ' + 'AM';
        }
        return currentTime;
    };

    // вычисление оставшихся дней до НГ
    const getNyRemainDays = () => {
        let nextYear = '31 Dec' + ' ' + currentDate.getFullYear();
        let timeStop = new Date(nextYear).getTime(),
            currentTime = new Date().getTime(),
            remainingTime = Math.floor((timeStop - currentTime) / 1000 / 60 / 60 / 24);
        return remainingTime;
    };

    // создание элементов на странице
    const displayData = () => {
        createNewItem(`Добрый день!`,'greeting');
        createNewItem(`Сегодня: Понедельник`, 'weekday');
        createNewItem(`Текущее время: 12:05:15 PM`, 'currentTime');
        createNewItem(`До нового года осталось 175 дней`, 'newYear');
    };

    // вывод данных расчета
    const updateData = () => {
        let greeting = document.querySelector('#greeting'),
            weekday = document.querySelector('#weekday'),
            currentTime = document.querySelector('#currentTime'),
            newYear = document.querySelector('#newYear');

        currentDate = new Date();

        greeting.textContent = getGreeting();
        weekday.textContent = `Сегодня: ${currentDay()}`;
        currentTime.textContent = `Текущее время: ${getCurrentTime()}`;
        newYear.textContent = `До нового года осталось ${declOfNum(getNyRemainDays(),
            ['день', 'дня', 'дней'])}`;

    };

    displayData();
    setInterval(updateData, 1000);
});