document.addEventListener("DOMContentLoaded", () => {
  const blockTitle = document.querySelectorAll("h2");
  const blockMainText = document.querySelectorAll(".sub-text");
  const videoBlock = document.querySelectorAll("video");
  const map = document.querySelector(".map-wrapper");

  blockTitle.forEach((elem) => {
    setObserver(elem, observerCallback);
  });
  blockMainText.forEach((elem) => {
    setObserver(elem, observerCallback);
  });
  videoBlock.forEach((elem) => {
    setObserver(elem, playVideo, { threshold: 0.75 });
  });
  setObserver(map, marketOnMap, { threshold: 0.75 });
  setEventHandlers();
});

const setObserver = (elem, callback, options = null) => {
  if (elem) {
    const observer = new IntersectionObserver((entries) => {
      callback(entries);
    }, options);
    observer.observe(elem);
  }
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
    // if (!entry.isIntersecting) entry.target.classList.remove("visible");
  });
};

const playVideo = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.play();
      entry.target.addEventListener("timeupdate", function () {
        // console.log("checking time...");
        if (entry.target.currentTime > entry.target.duration - 0.3) {
          // 0.5 is seconds before end.
          entry.target.pause();
        }
      });
    }
  });
};

const marketOnMap = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const map = document.querySelector(".map-wrapper");
      const markets = document.querySelectorAll(".marker");
      map.classList.add("visible");
      setMapShadow();
      for (let i = 0; i < markets.length; i++) {
        setTimeout(function () {
          markets[i].classList.add("visible");
        }, i * 300);
      }
    }
  });
};
const setEventHandlers = () => {
  burgerMenuHandler();
  btnHoverEffect();
  setSlider();
};

const burgerMenuHandler = () => {
  const burgerDots = document.querySelectorAll(".burger-dots");
  const body = document.querySelector("body");
  const portal = document.querySelector(".shadow-portal");
  const menu = document.querySelector(".mobile-menu");
  burgerDots.forEach((elem) =>
    elem.addEventListener("click", function () {
      body.classList.toggle("mobile-menu-active");
      portal.classList.toggle("active");
      menu.classList.toggle("active");

      portal.addEventListener("click", function () {
        body.classList.remove("mobile-menu-active");
        portal.classList.remove("active");
        menu.classList.remove("active");
      });
    })
  );
};

const btnHoverEffect = () => {
  const btn = document.querySelectorAll(".all-news");
  btn.forEach((elem) => {
    elem.addEventListener("mouseenter", function (e) {
      this.querySelector("span").style.top = `${e.offsetY}px`;
      this.querySelector("span").style.left = `${e.offsetX}px`;
    });
    elem.addEventListener("mouseout", function (e) {
      this.querySelector("span").style.top = `${e.offsetY}px`;
      this.querySelector("span").style.left = `${e.offsetX}px`;
    });
  });
};

const setMapShadow = () => {
  const shadowFilter = document.getElementById("filter0_d_101_2277");

  console.log(shadowFilter.querySelector("feOffset").attributes);
  console.log(shadowFilter.querySelector("feGaussianBlur").attributes);

  shadowFilter.querySelector("feOffset").attributes.dy.nodeValue = 0;
  shadowFilter.querySelector(
    "feGaussianBlur"
  ).attributes.stdDeviation.nodeValue = 0;

  console.log(shadowFilter.querySelector("feOffset").attributes);
  console.log(shadowFilter.querySelector("feGaussianBlur").attributes);

  for (let i = 0; i < 25; i++) {
    setTimeout(function () {
      shadowFilter.querySelector("feOffset").attributes.dy.nodeValue =
        new Number(
          shadowFilter.querySelector("feOffset").attributes.dy.nodeValue
        ) + 0.1;
      shadowFilter.querySelector(
        "feGaussianBlur"
      ).attributes.stdDeviation.nodeValue =
        new Number(
          shadowFilter.querySelector(
            "feGaussianBlur"
          ).attributes.stdDeviation.nodeValue
        ) + 0.1;
    }, i * 100);
  }
};

const setSlider = () => {
  const sliderArr = document.querySelector(".serves-row");

  new Swiper("#first-line", {
    init: true,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    loopedSlides: 0,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 3000,
    //allowTouchMove: false, // можно ещё отключить свайп
    autoplay: {
      delay: 0,
      disableOnInteraction: false, // или сделать так, чтобы восстанавливался autoplay после взаимодействия
    },
  });
  new Swiper("#second-line", {
    init: true,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    loopedSlides: 0,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 3000,
    //allowTouchMove: false, // можно ещё отключить свайп
    autoplay: {
      delay: 0,
      disableOnInteraction: false, // или сделать так, чтобы восстанавливался autoplay после взаимодействия
      reverseDirection: true,
    },
  });
};
