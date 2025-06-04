export function initPullAnimation() {
  const pullElements = document.querySelectorAll('[data-animation="pull"]');

  if (!pullElements.length) return;

  const config = {
    maxDistance: 300,
    pullStrength: 0.50,
    returnSpeed: 0.2,
  };

  const elementPositions = new Map();

  pullElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const originalX = rect.left + rect.width / 2;
    const originalY = rect.top + rect.height / 2 + window.scrollY;

    elementPositions.set(element, {
      originalX,
      originalY,
      currentX: originalX,
      currentY: originalY,
    });

    if (window.getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }
  });

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY + window.scrollY;

    pullElements.forEach((element) => {
      const position = elementPositions.get(element);
      const rect = element.getBoundingClientRect();
      const elemCenterX = rect.left + rect.width / 2;
      const elemCenterY = rect.top + rect.height / 2 + window.scrollY;

      const deltaX = mouseX - elemCenterX;
      const deltaY = mouseY - elemCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < config.maxDistance) {
        const pullFactor =
          (1 - distance / config.maxDistance) * config.pullStrength;

        position.currentX = position.originalX + deltaX * pullFactor;
        position.currentY = position.originalY + deltaY * pullFactor;
      } else {
        position.currentX +=
          (position.originalX - position.currentX) * config.returnSpeed;
        position.currentY +=
          (position.originalY - position.currentY) * config.returnSpeed;
      }

      const translateX = position.currentX - position.originalX;
      const translateY = position.currentY - position.originalY;
      element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  });
}
