const countTimer = (deadline) => {
    // получаем элементы страницы
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    // определяем дедлайн и текущее время
    const getRemainingTime = () => {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            remainingTime = (dateStop - dateNow) / 1000,
            seconds = Math.floor(remainingTime % 60),
            minutes = Math.floor((remainingTime / 60) % 60),
            hours = Math.floor(remainingTime / 60 / 60);
        // Если нужно добавить дни к таймеру:
        // hours = Math.floor((remainingTime / 60 / 60) % 24),
        // days = Math.floor(remainingTime / 60 / 60 / 24);
        // console.log(days);

        return {remainingTime, hours, minutes, seconds};
    };

    // форматирование таймера с добавлением нуля
    const twoDigits = (value) => {
        if (value < 10) {
            value = '0' + value;
        }
        return value;
    };

    // обновление таймера
    let intervalId;
    const clockUpdate = () => {
        let timer = getRemainingTime();
        timerHours.textContent = twoDigits(timer.hours);
        timerMinutes.textContent = twoDigits(timer.minutes);
        timerSeconds.textContent = twoDigits(timer.seconds);

        if (timer.remainingTime <= 0) {
            clearInterval(intervalId);
            timerHours.textContent = "--";
            timerMinutes.textContent = "--";
            timerSeconds.textContent = "--";
        }
    };
    intervalId = setInterval(clockUpdate, 1000);

    clockUpdate();
};

export default countTimer;