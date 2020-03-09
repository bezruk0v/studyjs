const calcValidation = () => {
    const calcItem = document.querySelectorAll('.calc-item');
    // перебор элементов и разрешение ввода только цифр
    calcItem.forEach((item) => {
        if (!item.classList.contains('calc-type')) {
            item.addEventListener('input', (event) => {
                let target = event.target;
                target.textContent = target.toString().replace(/[^0-9]/);
            });
        }
    });
};

export default calcValidation;