import { gsap } from "gsap";

export function initLoader() {
 
  const loader = document.getElementById("page-loader");


  if (!loader) {
    return {
      complete: () => {},
    };
  }
  const chars = document.querySelectorAll(".loader__char");
  const subtitle = document.querySelector(".loader__subtitle");
  const progressFill = document.querySelector(".loader__progress-fill");
  const percentage = document.querySelector(".loader__percentage");
  const dots = document.querySelectorAll(".loader__dot");
  const circles = document.querySelectorAll(".loader__circle");
  const allContentElements = document.querySelectorAll(
    "body > *:not(#page-loader)"
  );

  gsap.set(chars, { opacity: 0, y: 50, rotationX: -90 });
  gsap.set(subtitle, { opacity: 0, scale: 0.8 });
  gsap.set(progressFill, { scaleX: 0 });
  gsap.set(dots, { scale: 0, opacity: 0 });
  gsap.set(circles, { scale: 0, opacity: 0 });
  gsap.set(allContentElements, { opacity: 0 });

 
  const tl = gsap.timeline();

  
  tl.to(circles, {
    scale: 1,
    opacity: 0.1,
    duration: 1.5,
    stagger: 0.2,
    ease: "elastic.out(1, 0.8)",
  });


  tl.to(
    chars,
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(1.7)",
    },
    "-=1"
  );


  tl.to(
    subtitle,
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    },
    "-=0.4"
  );


  tl.to(
    dots,
    {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)",
    },
    "-=0.2"
  );


  const progressTl = gsap.timeline({ repeat: -1 });

  progressTl.to(progressFill, {
    scaleX: 1,
    duration: 2,
    ease: "power2.inOut",
  });

  progressTl.to(
    {},
    {
      duration: 2,
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        percentage.textContent = `${progress}%`;
      },
    },
    0
  );


  const dotsAnimation = gsap.timeline({ repeat: -1 });
  dotsAnimation.to(dots, {
    scale: 1.5,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.inOut",
    yoyo: true,
    repeat: 1,
  });


  tl.add(progressTl, "-=0.5");
  tl.add(dotsAnimation, "-=2");


  gsap.to(chars, {
    y: -5,
    duration: 2,
    stagger: 0.1,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    delay: 1,
  });


  gsap.delayedCall(3, () => {
    completeLoading();
  });

  function completeLoading() {

    gsap.killTweensOf([dots, chars]);
    progressTl.kill();
    dotsAnimation.kill();

    gsap.to(progressFill, {
      scaleX: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(
      {},
      {
        duration: 0.5,
        onUpdate: function () {
          const progress = Math.round(85 + this.progress() * 15);
          percentage.textContent = `${progress}%`;
        },
        onComplete: () => {
          percentage.textContent = "100%";

     
          const exitTl = gsap.timeline();

    
          exitTl.to(chars, {
            scale: 1.2,
            opacity: 0,
            y: -30,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.in(1.7)",
          });

          exitTl.to(
            [subtitle, progressFill, percentage, dots],
            {
              opacity: 0,
              scale: 0.8,
              duration: 0.4,
              ease: "power2.in",
            },
            "-=0.3"
          );

          exitTl.to(
            circles,
            {
              scale: 2,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.in",
            },
            "-=0.4"
          );

      
          exitTl.to(loader, {
            y: -window.innerHeight,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
        
              gsap.to(allContentElements, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              });

           
              gsap.delayedCall(0.5, () => {
                loader.remove();

              
                document.dispatchEvent(new CustomEvent("loaderComplete"));
              });
            },
          });
        },
      }
    );
  }

  // Add some interactive hover effects
  chars.forEach((char) => {
    char.addEventListener("mouseenter", () => {
      gsap.to(char, {
        scale: 1.2,
        color: "var(--primary)",
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    char.addEventListener("mouseleave", () => {
      gsap.to(char, {
        scale: 1,
        color: "var(--foreground)",
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });
  });

  // Allow manual completion on click
  loader.addEventListener("click", () => {
    completeLoading();
  });

  return {
    complete: completeLoading,
  };
}
