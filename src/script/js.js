const timerInsert = document.querySelector('[data-timer-deadline]');

timerInsert.insertAdjacentHTML(`beforeend`, `
<h2 class="banner__title">-50% на все ноутбуки</h2>
<p class="banner__end">До конца акции:</p>
<div class="banner-countdown timer">
    <div class="banner-time-day">
        <span class="banner-number banner-number-day"></span>
        <span class="day"></span>
    </div>
    <div class="banner-time-hour">
        <span class="banner-number banner-number-hour"></span>
        <span class="hour"></span>
    </div>
    <div class="banner-time-minute">
        <span class="banner-number banner-number-minute"></span>
        <span class="minute"></span>
    </div>
    <div class="banner-time-second none">
        <span class="banner-number banner-number-second"></span>
        <span class="second"></span>
    </div>
</div>
`);

const timer = document.querySelector(`.timer`);
timer.dataset.deadline = '2024/09/30 GMT+0300';

const timerWork = deadline => {
  const bannerNumberDay = document.querySelector(`.banner-number-day`);
  const bannerNumberHours = document.querySelector(`.banner-number-hour`);
  const bannerNumberMinute = document.querySelector(`.banner-number-minute`);
  const bannerNumberSecond = document.querySelector(`.banner-number-second`);
  const bannerTimeDay = document.querySelector(`.day`);
  const bannerTimeHour = document.querySelector(`.hour`);
  const bannerTimeMinute = document.querySelector(`.minute`);
  const bannerTimeSecond = document.querySelector(`.second`);
  const divDay = document.querySelector(`.banner-time-day`);
  const divSecond = document.querySelector(`.banner-time-second`);

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const TimeRemaining = dateStop - dateNow;

    const declOfNum = (number, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[
                (number % 100 > 4 && number % 100 < 20) ?
                2 :
                cases[(number % 10 < 5) ? number % 10 : 5]
      ];
    };

    bannerTimeMinute.textContent =
    declOfNum(Math.floor(TimeRemaining / 1000 / 60 % 60),
        ['минута', 'минуты', 'минут']);
    bannerTimeDay.textContent =
    declOfNum(Math.floor(TimeRemaining / 1000 / 60 / 60 / 24),
        ['день', 'дня', 'дней']);
    bannerTimeHour.textContent =
    declOfNum(Math.floor(TimeRemaining / 1000 / 60 / 60 % 24),
        ['час', 'часа', 'часов']);
    bannerTimeSecond.textContent =
        declOfNum(Math.floor(TimeRemaining / 1000 % 60),
            ['секунда', 'секунды', 'секунд']);

    const hoursZero = () => {
      let a = Math.floor(TimeRemaining / 1000 / 60 / 60 % 24);
      if (a < 10) {
        a = `0` + a;
      }
      return a;
    };

    const minutesZero = () => {
      let a = Math.floor(TimeRemaining / 1000 / 60 % 60);
      if (a < 10) {
        a = `0` + a;
      }
      return a;
    };

    const secondsZero = () => {
      let a = Math.floor(TimeRemaining / 1000 % 60);
      if (a < 10) {
        a = `0` + a;
      }
      return a;
    };

    const day = Math.floor(TimeRemaining / 1000 / 60 / 60 / 24);
    const hours = hoursZero();
    const minutes = minutesZero();
    const seconds = secondsZero();

    return {TimeRemaining, day, hours, minutes, seconds};
  };

  const start = () => {
    const timer = getTimeRemaining();

    bannerNumberDay.textContent = timer.day;
    bannerNumberHours.textContent = timer.hours;
    bannerNumberMinute.textContent = timer.minutes;
    bannerNumberSecond.textContent = timer.seconds;

    const intervalID = setTimeout(start, 1000);

    if (timer.TimeRemaining <= 0) {
      clearTimeout(intervalID);
      const banner = document.querySelector(`.banner`);
      banner.remove();
    }

    if (bannerNumberDay.textContent === `0`) {
      divDay.classList.add(`none`);
      divSecond.classList.remove(`none`);
    }
  };

  start();
};

$(`.acc__list`).accordion({
  active: true,
  collapsible: true,
  heightStyle: `content`,
});

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

timerWork(timer.dataset.deadline);

