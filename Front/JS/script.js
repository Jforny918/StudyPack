document.addEventListener("DOMContentLoaded", function () {
  const playBtn = document.getElementById("play-btn");
  const video = document.getElementById("tablet-video");
  const screen = document.getElementById("tablet-screen");

  playBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (video.paused) {
      video.play();
      screen.classList.add("playing");
      playBtn.style.display = "none";
    } else {
      video.pause();
      screen.classList.remove("playing");
      playBtn.style.display = "flex";
    }
  });

  video.addEventListener("ended", function () {
    screen.classList.remove("playing");
    playBtn.style.display = "flex";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var carrossel = document.querySelector(".fifith-section .fs-carrossel");
  if (!carrossel) return;

  const slides = Array.from(carrossel.children);
  let index = 0;
  let slide = 0;
  const viewer = document.querySelector(".fifith-section .fs-viewer");
  const antBtn = document.querySelector(".fifith-section .fs-btn.ant");
  const proxBtn = document.querySelector(".fifith-section .fs-btn.prox");

  function compute() {
    const estilo = getComputedStyle(viewer);
    const peek = parseFloat(estilo.getPropertyValue("--peek")) || 0;
    const gap = parseFloat(getComputedStyle(carrossel).gap) || 0;

    const viewerWidth = viewer.clientWidth - peek * 2;
    viewer.style.setProperty("--slideW", `${viewerWidth}px`);
    slide = viewerWidth + gap;
  }

  function setActive(i) {
    slides.forEach((el, idx) => el.classList.toggle("is-active", idx === i));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    const x = Math.round(-index * slide);
    carrossel.style.transform = `translateX(${-index * slide}px)`;
    setActive(index);
  }

  function prox() {
    goTo(index + 1);
  }

  function ant() {
    goTo(index - 1);
  }

  compute();
  goTo(0);

  let rAF;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      const cur = index;
      compute();
      goTo(cur);
    });
  });

  let timer = setInterval(prox, 8000);
  viewer.addEventListener("mouseenter", () => clearInterval(timer));
  viewer.addEventListener(
    "mouseleave",
    () => (timer = setInterval(prox, 8000))
  );

  proxBtn?.addEventListener("click", prox);
  antBtn?.addEventListener("click", ant);
});
