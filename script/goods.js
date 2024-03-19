const toggleIcon = document.querySelector('.header__menu');
const toggleSVG = document.querySelector('.header__menu_svg');
const toggleP = document.querySelector('.header__menu_svg');

toggleIcon.addEventListener(`click`, e => {
  const target = e.target;
  if (target === toggleIcon || toggleSVG || toggleP) {
    toggleSVG.classList.toggle('header__menu_svg-close');
  }
});

$('.header__menu').click(() => {
  $('.header__menu-list').slideToggle(300);
});
