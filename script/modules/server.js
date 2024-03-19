import {renderCRM, sumContacts, sumOld} from './render.js';

let data = JSON.parse(localStorage.getItem('users')) || [];

const setTableStorage = (contact) => {
  data = JSON.parse(localStorage.getItem(`users`)) || [];
  data.push(contact);
  localStorage.setItem(`users`, JSON.stringify(data));
};

const removeStorage = (name) => {
  for (let i = data.length; i--;) {
    if (data[i].name === name) {
      data.splice(i, 1);
    }
  }
  localStorage.setItem(`users`, JSON.stringify(data));
};

const fetchRequest = async (url, {
  method = `GET`,
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (options.method === `get`) {
        sumContacts(data);
        sumOld(data);
      }

      const {
        tableTbody,
      } = renderCRM();

      if (callback) return callback(null, tableTbody, data);
      return;
    }

    throw new Error(response.status);
  } catch (err) {
    return callback(err);
  }
};

export default {
  fetchRequest,
  setTableStorage,
  removeStorage,
};
