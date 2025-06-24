import { expandNavigationMenu } from "./navigation.js";
import { showBlurEffectOnMouse } from "./mouseAnimations.js";
import { initModals } from "./modal.js";
import { initLoader } from "./loader.js";
import {
  initScrollAnimations,
  initFlagAnimation,
  initPullAnimation,
} from "./animations/index.js";

const loader = initLoader();


document.addEventListener("loaderComplete", () => {
  expandNavigationMenu();
  showBlurEffectOnMouse();
  initModals();
  initScrollAnimations();
  initFlagAnimation();
  initPullAnimation();
});
