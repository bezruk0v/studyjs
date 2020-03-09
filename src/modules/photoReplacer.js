const photoReplace = () => {
    // получение фотографий
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((item) => {
        // получение ссылки на фото
        let currentPhoto = item.src;
        // ОС: замена фото при наведении
        item.addEventListener('mouseenter', (event) => {
            event.target.src = event.target.dataset.img;
        });
        // ОС: возвращение фото по умолчанию при снятии наведения
        item.addEventListener('mouseout', (event) => {
            event.target.src = currentPhoto;
        });
    });
};

export default photoReplace;