function openModal(modalName, src , alt) {
  const $modal = document.querySelector(`dialog[data-modal=${modalName}]`);

  fullScreenImageModalContent(src, alt);
  $modal.showModal();

  const $closeButton = $modal.querySelector("[data-close]");

  $closeButton.addEventListener("click", () => {
    $modal.close();
  });
}

export function initModals() {
  const $triggers = document.querySelectorAll("img[data-trigger]");

  $triggers.forEach(($trigger) => {
    $trigger.addEventListener("click", () => {
      openModal($trigger.getAttribute("data-trigger"), $trigger.src , $trigger.alt);
    });

    $trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        openModal($trigger.getAttribute("data-trigger"));
      }
    });
  });
}

function fullScreenImageModalContent(src, alt) {

  
  const $modalContent = document.getElementById("modal-content");

  $modalContent.innerHTML = `<img class="img modal-content__img" src="${src}" alt="${alt}">`;

}

