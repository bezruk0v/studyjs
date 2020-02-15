'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const books = document.querySelectorAll('.book');

    // определяем id книгам по содержимому
    books[0].id = 'Книга 2';
    books[1].id = 'Книга 1';
    books[2].id = 'Книга 6';
    books[3].id = 'Книга 4';
    books[4].id = 'Книга 3';
    books[5].id = 'Книга 5';

    // воостановление порядка книг
    const sortBooks = () => {
        const dict = {};
        const parent = books[0].parentNode;

        books.forEach(node => {
            const key = node.id;
            dict[key] = node;
            node.parentNode.removeChild(node);
        });

        const keys = Object.keys(dict);
        keys.sort().forEach(k => parent.appendChild(dict[k]));
    };

    sortBooks();

    // замена картинки фона
    document.body.style = `background-image: url(./image/you-dont-know-js.jpg)`;

    // исправление заголовка у третьей книги
    const book3Title = books[4].querySelector('a');
    book3Title.textContent = 'Книга 3. this и Прототипы Объектов';

    // удаление рекламного баннера
    document.querySelector('.adv').style = 'display: none';

    // восстановление порядка глав во второй и пятой книгах
    const plotBook2 = books[0].querySelectorAll('li');
    const plotBook5 = books[5].querySelectorAll('li');

    const resortPlot = (plot) => {

        const dict = {};
        const parent = plot[0].parentNode;
        plot.forEach(node => {
            const key = node.innerText;
            dict[key] = node;
            node.parentNode.removeChild(node);
        });

        const keys = Object.keys(dict);
        parent.appendChild(dict[keys[0]]);
        parent.appendChild(dict[keys[1]]);
        keys.slice(2).sort().forEach(k => parent.appendChild(dict[k]));

    };

    resortPlot(plotBook2);
    resortPlot(plotBook5);

    // добавление в шестую книгу главы в нужное место
    const chapters = books[2].querySelector('ul');
    const chapterNode = chapters.querySelector('li');
    const newChapter = chapterNode.cloneNode(true);
    newChapter.innerText = "Глава 8: За пределами ES6";

    chapters.appendChild(newChapter);

    const collection = books[2].querySelectorAll('li');
    chapters.insertBefore(collection[collection.length - 1], collection[collection.length - 2]);

});