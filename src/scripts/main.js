import { expandNavigationMenu } from "./navigation.js";
import { showBlurEffectOnMouse } from "./mouseAnimations.js";
import { initModals } from "./modal.js";

expandNavigationMenu();
showBlurEffectOnMouse();
initModals();

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);
});
