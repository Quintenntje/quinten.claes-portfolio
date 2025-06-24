import { expandNavigationMenu } from "./navigation.js";
import { showBlurEffectOnMouse } from "./mouseAnimations.js";
import { initModals } from "./modal.js";
import { initLoader } from "./loader.js";
import {
  initScrollAnimations,
  initFlagAnimation,
  initPullAnimation,
} from "./animations/index.js";

function initializeApp() {
  expandNavigationMenu();
  showBlurEffectOnMouse();
  initModals();
  initScrollAnimations();
  initFlagAnimation();
  initPullAnimation();
}

const hasLoader = document.getElementById("page-loader");

if (hasLoader) {
  const loader = initLoader();
  document.addEventListener("loaderComplete", initializeApp);
} else {
  document.addEventListener("DOMContentLoaded", initializeApp);
}
