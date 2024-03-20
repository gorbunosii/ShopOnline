const localData = JSON.parse(localStorage.getItem('goods')) || [];

const setTableStorage = (contact) => {
  localData.push(contact);
  localStorage.setItem('goods', JSON.stringify(localData));
};

const removeStorage = (name) => {
  for (let i = localData.length; i--;) {
    if (localData[i].title === name) {
      localData.splice(i, 1);
    }
  }
  localStorage.setItem('goods', JSON.stringify(localData));
};

export default {
  localData,
  setTableStorage,
  removeStorage,
};
