import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const initScrollAnimations = () => {

  const animatedElements = document.querySelectorAll("[data-animation]");

  
  const titleElements = document.querySelectorAll("[data-animation='stagger']");


  titleElements.forEach((element) => {
    
    const splitText = new SplitText(element, {
      type: "chars,words",
      linesClass: "line",
      charsClass: "char",
      wordsClass: "word",
    });


    gsap.fromTo(
      splitText.chars,
      {
        opacity: 0,
        y: 20,
        rotationX: -90,
        transformOrigin: "0% 50% -50",
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100px",
          once: true,
        },
      }
    );
  });


  animatedElements.forEach((element) => {
    const animationType = element.dataset.animation;

    if (animationType === "stagger") return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: animationType === "fade-up" ? 30 : 0,
        x:
          animationType === "slide-left"
            ? -30
            : animationType === "slide-right"
            ? 30
            : 0,
        scale: animationType === "scale" ? 0.8 : 1,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100px",
          toggleClass: "animated",
          once: true,
        },
      }
    );
  });

  titleElements.forEach((title) => {
    const splitTitle = new SplitText(title, { type: "chars,words" });

    gsap.fromTo(
      splitTitle.chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top bottom-=100px",
          toggleClass: "animated",
          once: true,
        },
      }
    );
  });

  // Add specific animation for fade-in elements
  const fadeElements = document.querySelectorAll("[data-animation='fade-in']");

  fadeElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=80px",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Animate project cards with staggered effect
  const projectCards = document.querySelectorAll(".card--secondary");
  if (projectCards.length > 0) {
    gsap.fromTo(
      projectCards,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectCards[0].parentElement,
          start: "top bottom-=50px",
          once: true,
        },
      }
    );
  }

  // Animate timeline cards with staggered effect
  const timelineCards = document.querySelectorAll(".timeline__item");
  if (timelineCards.length > 0) {
    gsap.fromTo(
      timelineCards,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineCards[0].parentElement,
          start: "top bottom-=50px",
          once: true,
        },
      }
    );
  }

  // Add fade-in animations to paragraphs in about section
  const aboutParagraphs = document.querySelectorAll(
    "section p:not([data-animation])"
  );
  if (aboutParagraphs.length > 0) {
    gsap.fromTo(
      aboutParagraphs,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutParagraphs[0],
          start: "top bottom-=50px",
          once: true,
        },
      }
    );
  }
};

export { initScrollAnimations };
