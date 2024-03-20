import {renderCRM, sumContacts, sumOld} from './render.js';
import serviceStorage from './serviceStorage.js';
const {localData} = serviceStorage;

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

      if (callback) return callback(null, tableTbody, data, localData);
      return;
    }

    throw new Error(response.status);
  } catch (err) {
    return callback(err);
  }
};

export default {
  fetchRequest,
};
