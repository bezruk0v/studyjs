'use strict';
// Промисы === Обещания

const doUniversity = (docs) => {
    return new Promise((resolve, reject) => {
        if (docs) {
            console.log('Рассмотрение документов...');
            setTimeout(() => {
                if (Math.random() > 0.3) {
                    let result = 'Принят';
                    resolve(result);
                } else {
                    reject('Отказано');
                }
            }, 3000);
        } else {
            reject('Отказано, не хватает документов');
        }
    });
};

const doArmy = (docs) => {
    return new Promise((resolve, reject) => {
        if (docs) {
            console.log('Военком думает...');
            console.log('Документы от военкомата:' + docs);
            setTimeout(() => {
                if (docs === 'Принят') {
                    resolve('Отсрочка');
                    console.log('Отсрочка');
                } else {
                    reject('Повестка');
                }
            }, 2000);
        } else {
            reject('Повестка');
        }
    });
};

const doWOrk = (docs) => {
    return new Promise((resolve, reject) => {
        console.log('Директор Google думает...');
        console.log(docs);
        setTimeout(() => {
            if (Math.random() > 0.3) {
                let result = 'Приглашен на собеседование в Google в Понедельник';
                console.log(result);
                resolve(result);
            } else {
                reject('Отказано, иди в Яндекс!');
            }
        }, 3000);
    });
};

const party = (docs) => {
    console.log('Потанцевали');
    return Promise.resolve(docs);
};

const documents = ['Паспорт', 'Аттестат'];

/*
doUniversity(documents)
    .then((result) => {
        console.log(result);
        return result;
    }, (reason) => {
        console.log(reason);
    })
    .then(doArmy)
    .then(party)
    .then(doWOrk)
    .catch((reason) => {
        console.error(reason);
    })
    .finally(() => console.warn('Выполнится в любом случае'));*/

const doWorking = (company) => {
    return new Promise((resolve, reject) => {
        const time = Math.ceil(Math.random() * 3000);
        setTimeout(() => {
            if (time % 7) {
                console.log(company);
                resolve(company);
            } else {
                reject(company);
            }
        }, time);
    });
};

const hh = doWorking('HH'),
    yandex = doWorking('Yandex'),
    ozon = doWorking('Ozon'),
    pikabu = doWorking('Pikabu'),
    politics = doWorking('Гос дума');

// Promise.all([hh, yandex, ozon, pikabu, politics])
Promise.race([hh, yandex, ozon, pikabu, politics])
    .then(result => console.log(`Тебя пригласили на собеседование в: ${result}`))
    .catch(result => console.error(`Компания ${result} отказала`));