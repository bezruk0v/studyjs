'use strict';
document.addEventListener('DOMContentLoaded', () => {

    // форма управления
    const form = document.querySelector('.todo-control'),
        // строка ввода заданий
        headerInput = document.querySelector('.header-input'),
        // список заданий к выполнению
        toDoList = document.getElementById('todo'),
        // список выполненных заданий
        toDoDoneList = document.getElementById('completed');

    // объект с заданиями
    let data = {
        todo: [],
        completed: []
    };

    // вывод данных в data, если localStorage не пустой
    if (localStorage.getItem('localData')) {
        data = JSON.parse(localStorage.getItem('localData'));
    }

    // добавление данных в localStorage
    function localStorageUpdate() {
        localStorage.setItem('localData', JSON.stringify(data));
    }

    // удаление элементов из списков
    function itemRemove(elem) {
        const item = elem.parentNode.parentNode,
            itemParent = item.parentNode,
            id = itemParent.id,
            text = item.textContent;

        if (id === 'todo') {
            data.todo.splice(data.todo.indexOf(text), 1);
        } else {
            data.completed.splice(data.todo.indexOf(text), 1);
        }

        itemParent.removeChild(item);

        localStorageUpdate();
    }

    // перенос дел в список выполненных
    function itemComplete(elem) {
        const item = elem.parentNode.parentNode,
            itemParent = item.parentNode,
            id = itemParent.id,
            text = item.textContent;

        let target;

        if (id === 'todo') {
            target = toDoDoneList;
        } else {
            target = toDoList;
        }

        if (id === 'todo') {
            data.todo.splice(data.todo.indexOf(text), 1);
            data.completed.push(text);
        } else {
            data.completed.splice(data.todo.indexOf(text), 1);
            data.todo.push(text);
        }

        itemParent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);

        localStorageUpdate();
    }

    // рендер элемента
    function renderItem(text, completed = false) {
        const item = document.createElement('li'),
            toDoBtns = document.createElement('div'),
            toDoRemoveBtn = document.createElement('button'),
            btnComplete = document.createElement('button');

        let list;
        if (completed) {
            list = toDoDoneList;
        } else {
            list = toDoList;
        }

        item.classList.add('todo-item');
        toDoBtns.classList.add('todo-buttons');
        toDoRemoveBtn.classList.add('todo-remove');
        btnComplete.classList.add('todo-complete');

        item.textContent = text;

        toDoBtns.appendChild(toDoRemoveBtn);
        toDoBtns.appendChild(btnComplete);
        item.appendChild(toDoBtns);

        toDoRemoveBtn.addEventListener('click', function (event) {
            itemRemove(event.target);
        });

        btnComplete.addEventListener('click', function (event) {
            itemComplete(event.target);
        });

        list.insertBefore(item, list.childNodes[0]);

    }

    // рендер объект с заданиями
    function renderItems() {
        if (!data.todo.length && !data.completed.length) {
            return;
        } else {
            for (let i = 0; i < data.todo.length; i++) {
                renderItem(data.todo[i]);
            }
            for (let i = 0; i < data.completed.length; i++) {
                renderItem(data.completed[i], true);
            }
        }
    }

    // добавление элемента в список невыполненных дел
    function addItem(text) {
        renderItem(text);
        headerInput.value = '';
        data.todo.push(text);

        localStorageUpdate();
    }

    // ОС срабатывает, если в поле вводе что-то заполнено
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (headerInput.value !== '') {
            addItem(headerInput.value.trim());
        }
    });

    renderItems();
});