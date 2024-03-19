import createElem from './createElements.js';
const {createRow} = createElem;

export const renderCRM = () => {
//   const btnAdd = document.querySelector(`.table-add`);
  const btnDel = document.querySelector(`.basket__card_delete`);
  const tableTbody = document.querySelector(`.tbody`);
  const sumModal = document.querySelector(`.sum`);
  const idCheckbox = document.getElementById('selectAll');
  const URL = `https://lydian-romantic-litter.glitch.me/api/goods`;


  return {
    btnDel,
    tableTbody,
    sumModal,
    idCheckbox,
    URL,
  };
};

export const renderContacts = (x, tableTbody, data) => {
  if (x) {
    console.warn(x, data);
    console.log(`Что-то пошло не так...`);
  }
  const alllRow = data.goods.map(createRow);
  tableTbody.append(...alllRow);

  return `Успех`;
};

export const sumContacts = (data) => {
  const allSumCRM = document.querySelector(`.sum`);
  const sumCRM = data.goods.reduce((sum, elem) =>
    sum + (elem.count * elem.price), 0);
  allSumCRM.textContent = `${sumCRM} ₽`;
};

export const sumOld = (data) => {
  const sumOldAll = document.querySelector(`.basket__card_text`);
  const discount = document.querySelector(`.basket__card_item-text-gray-discount`);
  const photoBottom = document.querySelector(`.basket__card_delivery-photo`);
  const sumCRM = data.goods.reduce((sum, elem) =>
    sum + (elem.count * elem.price), 0);
  sumOldAll.textContent = `${sumCRM + Math.round(sumCRM * 0.28)} ₽`;
  discount.textContent = Math.round(sumCRM * 0.28) + ' ₽';
  data.goods.forEach(element => {
    const picture = document.createElement(`img`);
    picture.classList.add(`td-body-pictureBottom`);
    picture.src = element.image;
    photoBottom.append(picture);
  });
};
