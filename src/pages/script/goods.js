import {renderCRM, renderGoods} from './modules/render.js';
import modulStorage from './modules/server.js';
const {fetchRequest} = modulStorage;

const init = () => {
  const {
    btnDel,
    tableTbody,
    sumModal,
    idCheckbox,
    URL,
  } = renderCRM();

  fetchRequest(URL, {
    method: `get`,
    callback: renderGoods,
  });
};

init();
