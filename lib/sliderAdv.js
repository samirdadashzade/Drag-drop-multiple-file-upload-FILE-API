"use strict";

var index = 0;
var slides = document.querySelectorAll('.lenta li');

document.querySelector('.arrow_left').onclick = function () {
  SlideLeft();
};

document.querySelector('.arrow_right').onclick = function () {
  SlideRight();
};

function Slide() {
  document.querySelector('.lenta').style.left = -index * 800 + "px";
}

var sliderInterval = setInterval(function () {
  SlideRight();
}, 2000);

function SlideRight() {
  index++;

  if (index === slides.length) {
    index = 0;
  }

  Slide();
}

function SlideLeft() {
  index--;

  if (index < 0) {
    index = slides.length - 1;
  }

  Slide();
}

document.querySelector('.window').onmouseover = function () {
  clearInterval(sliderInterval);
};

document.querySelector('.window').onmouseout = function () {
  sliderInterval = setInterval(function () {
    SlideRight();
  }, 2000);
}; // let i = 0;
// let timer = setInterval(
//     function () { 
//         console.log(i++);
//         if(i === 10) clearInterval(timer);
//     }, 
//     1000);