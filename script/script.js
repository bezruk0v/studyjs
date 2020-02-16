'use strict';
document.addEventListener('DOMContentLoaded', () => {

    function DomElement(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height + 'px';
        this.width = width + 'px';
        this.backgroundColor = bg;
        this.fontSize = fontSize + 'px';
    }

    const table = document.querySelector('td');

    DomElement.prototype.createElement = function () {
        if (this.selector[0] === '.') {
            const div = document.createElement('div');
            div.classList.add('block');
            div.textContent = '.block - div';
            table.insertBefore(div, table.childNodes[0]);
            div.style.cssText = `
                 height: ${this.height};
                 width: ${this.width};
                 background-color: ${this.backgroundColor};
                 font-size: ${this.fontSize};`;
        } else if (this.selector[0] === '#') {
            const paragraph = document.createElement('p');
            paragraph.setAttribute('id', 'best');
            paragraph.textContent = '#best - параграф';
            table.insertBefore(paragraph, table.childNodes[0]);
            paragraph.style.cssText = `
            height: ${this.height};
            width: ${this.width};
            background-color: ${this.backgroundColor};
            font-size: ${this.fontSize};`;
        }
    };

    const element1 = new DomElement('.block', '200', '300', '#f56f42', '30'),
    element2 = new DomElement('#best', '200', '500', '#4272f5', '30');

    element1.createElement();
    console.log(element1);
    element2.createElement();
    console.log(element2);

});