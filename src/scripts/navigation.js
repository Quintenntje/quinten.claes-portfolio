export function expandNavigationMenu() {
  const $openNav = document.getElementById("open-nav");
  const $closeNav = document.getElementById("close-nav");
  const $navList = document.getElementById("nav-list");
  const $body = document.body;

  const $overlay = document.createElement("div");
  $overlay.className = "nav__overlay";
  $overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild($overlay);

  const $hamburger = document.createElement("div");
  $hamburger.className = "nav__hamburger";
  $hamburger.innerHTML = `
    <span class="nav__hamburger-line"></span>
    <span class="nav__hamburger-line"></span>
    <span class="nav__hamburger-line"></span>
  `;

  const $openIcon = $openNav.querySelector(".icon");
  if ($openIcon) {
    $openIcon.style.display = "none";
    $openNav.appendChild($hamburger);
  }
  const media = window.matchMedia("(width < 768px)");

  function updateInertState() {
    if (media.matches) {
      $navList.setAttribute("inert", "true");
    } else {
      $navList.removeAttribute("inert");
      closeMenu();
    }
  }

  function openMenu() {
    if (!media.matches) return;

    $navList.classList.add("nav-list--open");
    $overlay.classList.add("nav__overlay--active");
    $hamburger.classList.add("nav__hamburger--active");
    $openNav.setAttribute("aria-expanded", "true");
    $navList.removeAttribute("inert");
    $body.style.overflow = "hidden";

    $openNav.classList.add("nav__button--hidden");
    $closeNav.classList.remove("nav__button--hidden");

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    const $navItems = $navList.querySelectorAll(".nav__list-item");
    $navItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(30px) translateY(10px)";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0) translateY(0)";
      }, index * 80 + 200);
    });
  }

  function closeMenu() {
    if (!media.matches) return;

    const $navItems = $navList.querySelectorAll(".nav__list-item");

    $navItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "0";
        item.style.transform = "translateX(30px) translateY(10px)";
      }, index * 30);
    });

    setTimeout(() => {
      $navList.classList.remove("nav-list--open");
      $overlay.classList.remove("nav__overlay--active");
      $hamburger.classList.remove("nav__hamburger--active");
      $closeNav.classList.add("nav__button--hidden");
      $openNav.classList.remove("nav__button--hidden");
      $openNav.setAttribute("aria-expanded", "false");
      $body.style.overflow = "";

      if (media.matches) {
        $navList.setAttribute("inert", "true");
      }
    }, 200);
  }

  updateInertState();

  media.addEventListener("change", updateInertState);

  $openNav.addEventListener("click", openMenu);
  $closeNav.addEventListener("click", closeMenu);
  $overlay.addEventListener("click", closeMenu);

  $navList.addEventListener("click", (event) => {
    if (event.target.matches("a") && media.matches) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      $navList.classList.contains("nav-list--open")
    ) {
      closeMenu();
    }
  });

  let startY = 0;

  $navList.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  $navList.addEventListener("touchmove", (e) => {
    const currentY = e.touches[0].clientY;
    const isScrollingUp = currentY > startY;
    const isScrollingDown = currentY < startY;

    if (
      ($navList.scrollTop === 0 && isScrollingUp) ||
      ($navList.scrollTop + $navList.offsetHeight >= $navList.scrollHeight &&
        isScrollingDown)
    ) {
      e.preventDefault();
    }
  });
}
