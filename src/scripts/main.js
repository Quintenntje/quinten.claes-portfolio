import { expandNavigationMenu } from "./navigation.js";
import { showBlurEffectOnMouse } from "./mouseAnimations.js";
import { initModals } from "./modal.js";
import {
  initScrollAnimations,
  initFlagAnimation,
  initPullAnimation,
} from "./animations/index.js";

expandNavigationMenu();
showBlurEffectOnMouse();
initModals();
initScrollAnimations();
initFlagAnimation();
initPullAnimation();
