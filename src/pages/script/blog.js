/* eslint-disable no-undef */
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
      p.classList = 'text';
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
    for (let i = 3; i--;) {
      const page = document.querySelectorAll(`.page`);
      if (params.get(`page`) === page[i].textContent) {
        page[i].classList.add(`page-blue`);
      } else {
        page[i].classList.remove(`page-blue`);
      }
    }
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
  if (params.get(`page`) > 3) {
    params.set(`page`, `3`);
  }
  loadGoods(renderGoods);
});

loadGoods(renderGoods);

$('.header__menu').click(() => {
  $('.header__menu-list').slideToggle(300);
});

$(`.acc__list`).accordion({
  active: true,
  collapsible: true,
  heightStyle: `content`,
});

const server = async () => {
  const response = await fetch(`https://lydian-romantic-litter.glitch.me/api/goods`);
  const data = await response.json();
  const countData = document.querySelector('.header-list__link-backet');
  countData.dataset.count = data.goods.length;
};

server();
