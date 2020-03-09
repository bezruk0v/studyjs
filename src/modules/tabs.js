const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
        tabContent.forEach((item, i) => {
            if (index === i) {
                tab[i].classList.add('active');
                item.classList.remove('d-none');
            } else {
                tab[i].classList.remove('active');
                item.classList.add('d-none');
            }
        });
    };

    tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.service-header-tab');
        if (target.classList.contains('service-header-tab')) {
            tab.forEach((item, index) => {
                if (item === target) {
                    toggleTabContent(index);
                }
            });
        }
    });
};

export default tabs;