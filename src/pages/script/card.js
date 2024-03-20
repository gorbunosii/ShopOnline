import {controlBtnAdd} from './modules/control.js';
import {renderCRM} from './modules/render.js';

const init = () => {
  const {
    btnAdd,
  } = renderCRM();

  controlBtnAdd(btnAdd);
};

init();

const params = new URLSearchParams(window.location.search);

const loadGoods = async (cb) => {
  const result = await fetch(`https://lydian-romantic-litter.glitch.me/api/goods/${params.get(`id`)}`);
  const data = await result.json();
  cb(data);
};


const renderGoods = (data) => {
  const mainTitle = document.querySelector(`.main-title`);
  const priceRed = document.querySelector(`.main-content-card-one-text-red`);
  const priceBlack = document.querySelector(`.main-content-card-one-text`);
  const priceBlue = document.querySelector(`.main-content-card-one-text-blue`);
  const photo = document.querySelector(`.main-content-photo`);
  const description = document.querySelector(`.description-text`);
  mainTitle.append(data.title);
  priceRed.append(data.price + ' ₽');
  priceBlack.append(Math.round(data.price + (data.price * 0.28)) + ' ₽');
  priceBlue.append('В кредит от ' + Math.round(data.price / 20) + ' ₽');
  photo.src = data.image;
  description.textContent = data.description;
};

loadGoods(renderGoods);
