import {controlDelete, thisChecked} from './modules/control.js';
import {renderCRM, renderContacts} from './modules/render.js';
import modulStorage from './modules/server.js';
const {fetchRequest} = modulStorage;

const init = () => {
  const {
    btnDel,
    idCheckbox,
    URL,
  } = renderCRM();

  fetchRequest(URL, {
    method: `get`,
    callback: renderContacts,
  });

  controlDelete(btnDel);
  thisChecked(idCheckbox);
};

init();

