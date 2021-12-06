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
        }, i * 700);
      }
    }
  });
};
