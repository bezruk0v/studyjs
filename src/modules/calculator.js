const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDays = document.querySelector('.calc-day'),
        calcRooms = document.querySelector('.calc-count'),
        calcTotal = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            roomsValue = 1,
            daysValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcRooms.value === 0 || calcRooms.value === '' || calcDays.value === 0 || calcDays.value === '') {
            total = 0;
        } else {
            if (calcRooms.value > 1) {
                roomsValue += (calcRooms.value - 1) / 10;
            }
            if (calcDays.value && calcDays.value < 5) {
                daysValue *= 2;
            } else if (calcDays.value && calcDays.value < 10) {
                daysValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * roomsValue * daysValue;
            } else {
                total = 0;
            }
        }

        calcTotal.textContent = Math.floor(total);
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        /*if (target.matches('.calc-type') || target.matches('.calc-square') ||
            target.matches('.calc-day') || target.matches('.calc-count')) {
            console.log(1);
        }*/
        /*if (target === calcType || target === calcSquare ||
            target === calcDays || target === calcRooms) {
            console.log(1);
        }*/
        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

export default calc;