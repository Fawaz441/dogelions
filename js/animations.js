const width = window.innerWidth;

const flightPath = {
  curviness: 2,
  autoRotate: true,
  values: [
    { x: 100, y: -20 },
    { x: 300, y: 10 },
    { x: 500, y: 100 },
    { x: 750, y: 400 },
    { x: 350, y: 500 },
    { x: 600, y: 100 },
    { x: 800, y: 0 },
    { x: window.innerWidth, y: -250 },
  ],
};

const tween = new TimelineLite();
tween.add(
  TweenLite.to(".body-wrapper", {
    opacity: 1,
    y: 0,
  })
);
tween.add(
  TweenLite.to(".calendar", {
    opacity: 1,
    y: 0,
  })
);
tween.add(
  TweenLite.to(".floating-img", 1, {
    bezier: flightPath,
    ease: Power1.easeInOut,
  })
);

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const controller = new ScrollMagic.Controller();
// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round(animationDuration / frameDuration);
// An ease-out function that slows the count as it progresses
const easeOutQuad = (t) => t * (2 - t);

// The animation function, which takes an Element
const animateCountUp = (el) => {
  let frame = 0;
  const countTo = parseInt(el.innerHTML, 10);
  // Start the animation running 60 times per second
  const counter = setInterval(() => {
    frame++;
    // Calculate our progress as a value between 0 and 1
    // Pass that value to our easing function to get our
    // progress on a curve
    const progress = easeOutQuad(frame / totalFrames);
    // Use the progress value to calculate the current count
    const currentCount = Math.round(countTo * progress);

    // If the current count has changed, update the element
    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = formatNumber(currentCount);
    }

    // If we’ve reached our last frame, stop the animation
    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};

const runAnimations = () => {
  const countupEls = document.querySelectorAll(".countup");
  console.log(countupEls);
  countupEls.forEach(animateCountUp);
};

runAnimations();

var body = document.body,
  html = document.documentElement;

var height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

const floatingPlanets = document.querySelectorAll(".floating-planet > image");

const svgs = [
  "#fire3",
  "#fire2",
  "#fire4",
  "#fire1",
  "#fire5",
  "#planet2",
  "#planet1",
  "#rocket",
];

svgs.forEach((svg) => {
  TweenLite.to(svg, {
    y: Math.random() * height,
    x: Math.random() * window.innerWidth,
    duration: 100,
  });
});

floatingPlanets.forEach((planet) => {
  TweenLite.to(planet, {
    y: Math.random() * height,
    x: Math.random() * window.innerWidth,
    duration: 100,
  });
});
