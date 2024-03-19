import {sumAll} from './control.js';

export const createRow = ({title, category, units, count,
  price, image, description, discount, id}) => {
  const tr = document.createElement('tr');

  const tdCheckbox = document.createElement('td');
  tdCheckbox.classList.add(`td-body-checkbox`);
  const input = document.createElement(`input`);
  input.classList.add(`td-body-input`);
  input.type = 'checkbox';
  tdCheckbox.append(input);

  const tdPicture = document.createElement('td');
  tdPicture.classList.add(`td-body`);
  const picture = document.createElement(`img`);
  picture.classList.add(`td-body-picture`);
  picture.src = image;
  tdPicture.append(picture);

  const tdDescription = document.createElement('td');
  tdDescription.classList.add(`td-body-description`);

  const tdName = document.createElement('p');
  tdName.classList.add(`td-body-name`);
  tdName.textContent = title;

  const tdCategory = document.createElement('p');
  tdCategory.classList.add(`td-body-category`);
  tdCategory.textContent = category;

  tdDescription.append(tdName, tdCategory);

  const tdAmount = document.createElement('td');
  tdAmount.classList.add(`td-body-amount`);

  const amountMinus = document.createElement('button');
  amountMinus.classList.add(`td-body-amount-minus`);

  const amount = document.createElement('p');
  amount.classList.add(`td-body-amount-number`);
  amount.textContent = count;

  const amountPlus = document.createElement('button');
  amountPlus.classList.add(`td-body-amount-plus`);
  tdAmount.append(amountMinus, amount, amountPlus);

  const tdPrice = document.createElement('td');
  tdPrice.classList.add(`td-body-price`);

  const tdPriceNew = document.createElement('p');
  tdPriceNew.classList.add(`td-body-priceNew`);
  tdPriceNew.textContent = price + ' ₽';

  const tdPriceOld = document.createElement('p');
  tdPriceOld.classList.add(`td-body-priceOld`);
  tdPriceOld.textContent = Math.round(price + (price * 0.28)) + ' ₽';

  const tdPriceCredit = document.createElement('a');
  tdPriceCredit.classList.add(`td-body-priceCredit`);
  tdPriceCredit.textContent = 'В кредит от ' + Math.round(price / 20) + ' ₽';
  tdPrice.append(tdPriceNew, tdPriceOld, tdPriceCredit);

  const tdDelete = document.createElement('td');
  tdDelete.classList.add(`td-body-button`);
  const deleteButton = document.createElement(`button`);
  deleteButton.classList.add(`basket__card_delete-more`);
  tdDelete.append(deleteButton);

  tr.classList.add(`order`);
  tr.append(tdCheckbox, tdPicture, tdDescription, tdAmount,
      tdPrice, tdDelete);

  amountMinus.addEventListener('click', e => {
    const target = e.target;
    if (target.closest(`.td-body-amount`).children[1].textContent <= 0) {
      target.closest(`.td-body-amount`).children[1].textContent = 0;
    } else {
      target.closest(`.td-body-amount`).children[1].textContent =
      Number(target.closest(`.td-body-amount`).children[1].textContent) - 1;
      sumAll();
    }
  });

  amountPlus.addEventListener('click', e => {
    const target = e.target;
    target.closest(`.td-body-amount`).children[1].textContent =
    Number(target.closest(`.td-body-amount`).children[1].textContent) + 1;
    sumAll();
  });

  tdDelete.addEventListener('click', e => {
    e.target.closest(`.order`).remove();
    sumAll();
  });

  return tr;
};

export default {
  createRow,
};
