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
  const container = document.querySelector(`.container-autor`);
  const userId = data.data[0].user_id;
  const user = async (ID) => {
    const result = await fetch(`https://gorest.co.in/public-api/users/${ID}`);
    const data = await result.json();
    container.append(data);
  };
  user(userId);
};

loadGoods(renderGoods);
