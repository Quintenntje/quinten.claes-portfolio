export function expandNavigationMenu() {
  const $openNav = document.getElementById("open-nav");
  const $closeNav = document.getElementById("close-nav");
  const $navList = document.getElementById("nav-list");

  const media = window.matchMedia("(width < 768px)");

  if (media.matches) {
    $navList.setAttribute("inert", "true");
  } else {
    $navList.removeAttribute("inert");
  }

  $openNav.addEventListener("click", () => {
    $navList.classList.add("nav-list--open");
    $openNav.classList.add("nav__button--hidden");
    $closeNav.classList.remove("nav__button--hidden");
    $openNav.setAttribute("aria-expanded", "true");
    $navList.removeAttribute("inert");
  });

  $closeNav.addEventListener("click", () => {
    $navList.classList.remove("nav-list--open");
    $closeNav.classList.add("nav__button--hidden");
    $openNav.classList.remove("nav__button--hidden");
    $openNav.setAttribute("aria-expanded", "false");
  });
}
