'use strict';

const moreButton = () => {
    const sentenceBtn = document.querySelector('.add-sentence-btn'),
        sentence = document.querySelector('.sentence'),
        sentenceBlocks = sentence.querySelectorAll('.col-xs-12');

    sentenceBtn.addEventListener('click', () => {
        sentenceBlocks.forEach((elem) => {
            if (elem.classList.contains('visible-sm-block')) {
                elem.classList.remove('visible-sm-block');
            } else if (elem.classList.contains('hidden')) {
                elem.classList.remove('hidden');
            }
        });
        sentenceBtn.style.display = 'none';
    });
};

export default moreButton;