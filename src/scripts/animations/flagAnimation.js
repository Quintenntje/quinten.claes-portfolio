import { gsap } from "gsap";

const initFlagAnimation = () => {
  const flagItems = document.querySelectorAll(".flag-text__item");

  if (flagItems.length === 0) return;


  const flagTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 2,
  });

  flagTl
    .to(".flag-text__item--black", {
      duration: 0.7,
      brightness: 1.2,
      scale: 1.05,
      ease: "power2.inOut",
    })
    .to(".flag-text__item--black", {
      duration: 0.5,
      brightness: 1,
      scale: 1,
      ease: "power2.inOut",
    })
    .to(".flag-text__item--yellow", {
      duration: 0.7,
      brightness: 1.2,
      scale: 1.05,
      ease: "power2.inOut",
    })
    .to(".flag-text__item--yellow", {
      duration: 0.5,
      brightness: 1,
      scale: 1,
      ease: "power2.inOut",
    })
    .to(".flag-text__item--red", {
      duration: 0.7,
      brightness: 1.2,
      scale: 1.05,
      ease: "power2.inOut",
    })
    .to(".flag-text__item--red", {
      duration: 0.5,
      brightness: 1,
      scale: 1,
      ease: "power2.inOut",
    });
};

export { initFlagAnimation };
