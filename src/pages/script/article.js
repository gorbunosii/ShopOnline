/* eslint-disable no-undef */
const params = new URLSearchParams(window.location.search);


const loadGoods = async (cb) => {
  const result = await fetch(`https://gorest.co.in/public-api/posts?id=${params.get(`id`)}`);
  const data = await result.json();
  cb(data);
};


const renderGoods = (data) => {
  const mainTitle = document.querySelector(`.main-title`);
  const mainContent = document.querySelector(`.main-content`);
  const story = document.querySelector(`.main-title-story`);
  mainContent.append(data.data[0].body);
  mainTitle.append(data.data[0].title);
  story.append(data.data[0].title);
  const container = document.querySelector(`.main-container-autor`);
  const userId = data.data[0].user_id;
  const user = async (ID) => {
    const result = await fetch(`https://gorest.co.in/public/v2/users/6792977`);
    const data = await result.json();
    container.append(data.name);
  };
  user(userId);
};

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

const back = document.querySelector('.button-left');
back.addEventListener(`click`, () => {
  history.back();
});

server();
