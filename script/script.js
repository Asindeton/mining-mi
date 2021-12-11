document.addEventListener("DOMContentLoaded", () => {
  setAllObservers();
  setEventHandlers();
  setScrollEvent();
});

const setAllObservers = () => {
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
};

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
  setCustomSelect(".custom-select");
  setCustomSelect(".date-select");
  document.addEventListener("click", closeAllSelect);
  loginEventHandler();
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
    }),
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

  shadowFilter.querySelector("feOffset").attributes.dy.nodeValue = 0;
  shadowFilter.querySelector(
    "feGaussianBlur",
  ).attributes.stdDeviation.nodeValue = 0;

  for (let i = 0; i < 25; i++) {
    setTimeout(function () {
      shadowFilter.querySelector("feOffset").attributes.dy.nodeValue =
        new Number(
          shadowFilter.querySelector("feOffset").attributes.dy.nodeValue,
        ) + 0.1;
      shadowFilter.querySelector(
        "feGaussianBlur",
      ).attributes.stdDeviation.nodeValue =
        new Number(
          shadowFilter.querySelector(
            "feGaussianBlur",
          ).attributes.stdDeviation.nodeValue,
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

const setCustomSelect = (selector) => {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.querySelectorAll(selector);
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
      if (selector == ".date-select") {
        this.parentElement.parentElement.classList.toggle("active");
      }
    });
  }

  /*if the user clicks anywhere outside the select box,
then close all select boxes:*/

  //    https://www.w3schools.com/howto/tryit.asp?filename=tryhow_custom_select
};
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  const options = document.querySelectorAll(".options");
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");

      // elmnt.parentElement.parentElement.classList.remove("active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
  options.forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
}

const loginEventHandler = () => {
  const btns = document.querySelectorAll(".login-event");
  btns.forEach((element) => {
    element.addEventListener("click", function () {
      // alert("Login");
      const body = document.querySelector("body");
      const portal = document.querySelector(".shadow-portal");
      const modal = document.querySelector(".modal");
      const loginClose = document.querySelector(".modal-close");

      portal.classList.add("active");
      body.classList.add("mobile-menu-active");
      modal.classList.add("active");

      portal.addEventListener("click", function () {
        body.classList.remove("mobile-menu-active");
        portal.classList.remove("active");
        modal.classList.remove("active");
      });
      loginClose.addEventListener("click", function () {
        body.classList.remove("mobile-menu-active");
        portal.classList.remove("active");
        modal.classList.remove("active");
      });
    });
  });
};

const setScrollEvent = () => {
  // console.log("scroll");
  // let counter = 0;
  // window.addEventListener("scroll", function (e) {
  //   counter -= 50;
  //   console.log(e);
  //   document.querySelector("body").style.transform = `translateY(${counter}px)`;
  // });
};
