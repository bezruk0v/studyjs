const toggleMenu = () => {
    // блок меню
    const menu = document.querySelector('menu');
    // октрытие/закрытие меню через переключение класса
    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    // ОС для "Меню"
    document.addEventListener('click', (event) => {
        let target = event.target;

        if (target.closest('.menu')) {
            handlerMenu();
        } else if (target.closest('.active-menu') && !target.classList.contains('active-menu')) {
            handlerMenu();
        } else {
            target = target.closest('.active-menu');
            if (menu.classList.contains('active-menu') && !target) {
                handlerMenu();
            }
        }
    });
};

export default toggleMenu;