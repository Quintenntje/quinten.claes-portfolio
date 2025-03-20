export function showBlurEffectOnMouse() {
  const $blur = document.getElementById("blur-mouse");
  document.addEventListener("mousemove", (e) => {
    const mouseY = e.clientY + window.scrollY;
    const mouseX = e.clientX;
    +window.scrollX;

    $blur.style.top = `${mouseY}px`;
    $blur.style.left = `${mouseX}px`;
  });
}
