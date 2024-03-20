/* eslint-disable no-undef */
/* eslint-disable max-len */
import serviceStorage from './serviceStorage.js';
const {data, setTableStorage, removeStorage} = serviceStorage;
import {createGoods} from './createElements.js';

export const sumAll = number => {
  const sumModal = document.querySelector(`.sum`);
  const price = Array.from(document.querySelectorAll(`.td-body-priceNew`));
  const count = Array.from(document.querySelectorAll(`.td-body-amount-number`));
  const sumOldAll = document.querySelector(`.basket__card_text`);
  const dataBefore = document.querySelector(`.basket__card_delivery-text-blackBig`);
  const dataCount = document.querySelector(`.basket__card_item-text-gray-count`);
  const discount = document.querySelector(`.basket__card_item-text-gray-discount`);
  const photo = Array.from(document.querySelectorAll(`.td-body-picture`));
  const photoBottom = document.querySelector(`.basket__card_delivery-photo`);
  const countData = document.querySelector('.header-list__link-backet');
  const arrOne = price.map(item => item.textContent.slice(0, -2));
  const arrTwo = count.map(item => item.textContent);
  const arr = [];
  for (let i = 0; i < arrOne.length; i++) {
    arr.push(arrOne[i] * arrTwo[i]);
  }
  const result = arr.reduce((sum, elem) =>
    sum + elem, 0);
  sumModal.textContent = result + ' ₽';
  sumOldAll.textContent = result + Math.round(result * 0.28) + ' ₽';
  photoBottom.textContent = ``;
  photo.forEach(item => {
    const picture = document.createElement(`img`);
    picture.classList.add(`td-body-pictureBottom`);
    picture.src = item.src;
    photoBottom.append(picture);
  });
  dataBefore.dataset.count = price.length;
  countData.dataset.count = price.length;
  dataCount.textContent = price.length;
  discount.textContent = Math.round(result * 0.28) + ' ₽';
};

export const controlDelete = btn => {
  btn.addEventListener('click', () => {
    const items = document.querySelectorAll('.td-body-input:checked');
    items.forEach(item => {
      item.closest('.order').remove();
      removeStorage(item.closest('.order').children[2].children[0].textContent);
    });
    sumAll();
  });
};

export const thisChecked = btn => {
  btn.addEventListener('click', () => {
    const items = document.querySelectorAll('.td-body-input');
    const itemsChecked = document.querySelectorAll('.td-body-input:checked');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const checkBoxes = document.querySelectorAll('.td-body-input:checked');
        btn.checked = checkBoxes.length === itemsChecked.length;
      });
    });
    items.forEach(item => item.checked = btn.checked);
    sumAll();
  });
};

export const controlBtnAdd = btn => {
  btn.addEventListener('click', async () => {
    const params = new URLSearchParams(window.location.search);
    const result = await fetch(`https://lydian-romantic-litter.glitch.me/api/goods/${params.get(`id`)}`);
    const resultData = await result.json();
    setTableStorage(resultData);
    createGoods(data);
    sumAll();
  });
};

const toggleIcon = document.querySelector('.header__menu');
const toggleSVG = document.querySelector('.header__menu_svg');
const toggleP = document.querySelector('.header__menu_svg');

toggleIcon.addEventListener(`click`, e => {
  const target = e.target;
  if (target === toggleIcon || toggleSVG || toggleP) {
    toggleSVG.classList.toggle('header__menu_svg-close');
  }
});

$('.header__menu').click(() => {
  $('.header__menu-list').slideToggle(300);
});

$(`.acc__list`).accordion({
  active: true,
  collapsible: true,
  heightStyle: `content`,
});
