// 'use strict';

const output = document.getElementById('output');

const getData = (url) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else {
                reject(request.statusText);
            }
        });
        request.send();
    });
};

const outputPhotos = (data) => {
    /*const random = Math.floor(Math.random() * data.length);
    const obj = data[random];
    console.log(obj);
    output.innerHTML = `<h2>${obj.title}</h2>
        <img src="${obj.thumbnailUrl}" alt="${obj.title}">`;
    console.log(obj.url);*/

    console.log(data);
    data.forEach((item) => {
        output.insertAdjacentHTML('beforebegin',
            `<h4>${item.title}</h4>
              <img src="${item.thumbnailUrl}" alt="${item.title}">`);
    });

};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const firstImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
    secondImg =getData('https://jsonplaceholder.typicode.com/photos/2'),
    thirdImg = getData('https://jsonplaceholder.typicode.com/photos/4');

/*getData(urlPhotos)
    .then(outputPhotos)
    .catch(error => console.error(error));*/

/*
firstImg
    .then(outputPhotos)
    .catch(error => console.log(error));
secondImg
    .then(outputPhotos)
    .catch(error => console.log(error));
*/

// Promise.all([firstImg, secondImg]);

Promise.all([firstImg, secondImg, thirdImg])
    .then(outputPhotos)
    .catch(error => console.error(error));