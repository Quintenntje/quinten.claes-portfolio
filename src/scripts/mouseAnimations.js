export function showBlurEffectOnMouse() {
  const $blur = document.getElementById("blur");
  document.addEventListener("mousemove", (e) => {
    $blur.classList.add("blur--active");
    const mouseY = e.clientY + window.scrollY;
    const mouseX = e.clientX;
    +window.scrollX;

    $blur.style.top = `${mouseY}px`;
    $blur.style.left = `${mouseX}px`;
  });
}
