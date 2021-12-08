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
      const markets = document.querySelectorAll(".marker");
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
