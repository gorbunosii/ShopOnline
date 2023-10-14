const params = new URLSearchParams(window.location.search);
params.append(`page`, `1`);

const loadGoods = async (cb) => {
  const result = await fetch(`https://gorest.co.in/public-api/posts?page=${params.get(`page`)}`);
  const data = await result.json();
  cb(data);
};

const renderGoods = (data) => {
  const postsData = data;

  const displayList = (arrData) => {
    const ul = document.querySelector(`.ul`);
    arrData.data.forEach((el, index) => {
      const a = document.createElement(`a`);
      const p = document.createElement(`p`);
      a.href = `article.html?id=${el.id}`;
      p.textContent = el.title;
      a.append(p);
      ul.children[index].append(a);
    });
  };
  displayList(postsData);
};

const btns = document.querySelectorAll('.page');
btns.forEach(elem => {
  elem.addEventListener('click', e => {
    params.set(`page`, `${e.target.closest(`.page`).textContent}`);
    const li = document.querySelectorAll(`.li`);
    li.forEach(elem => {
      elem.lastChild.remove();
    });
    loadGoods(renderGoods);
  });
});

const left = document.querySelector(`.button-left`);
const right = document.querySelector(`.button-right`);

left.addEventListener('click', e => {
  params.set(`page`, params.get(`page`) - 1);
  const li = document.querySelectorAll(`.li`);
  li.forEach(elem => {
    elem.lastChild.remove();
  });
  if (params.get(`page`) < 1) {
    params.set(`page`, `1`);
  }
  loadGoods(renderGoods);
});

right.addEventListener('click', e => {
  params.set(`page`, params.get(`page`) + 1);
  const li = document.querySelectorAll(`.li`);
  li.forEach(elem => {
    elem.lastChild.remove();
  });
  if (params.get(`page`) > 10) {
    params.set(`page`, `10`);
  }
  loadGoods(renderGoods);
});

loadGoods(renderGoods);

