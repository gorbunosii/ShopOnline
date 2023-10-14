const params = new URLSearchParams(window.location.search);


const loadGoods = async (cb) => {
  const result = await fetch(`https://gorest.co.in/public-api/posts?id=${params.get(`id`)}`);
  const data = await result.json();
  cb(data);
};


const renderGoods = (data) => {
  const header = document.querySelector(`header`);
  header.append(data.data[0].title);
  const main = document.querySelector(`main`);
  main.prepend(data.data[0].body);
  const container = document.querySelector(`.container`);
  const userId = data.data[0].user_id;
  const user = async (ID) => {
    const result = await fetch(`https://gorest.co.in/public-api/users/${ID}`);
    const data = await result.json();
    container.append(data);
  };
  user(userId);
};

loadGoods(renderGoods);
