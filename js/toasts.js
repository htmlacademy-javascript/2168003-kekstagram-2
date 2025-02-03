export function showToast(templateId, mainClass, { onClose = () => {}, closeAfter = null } = {}) {
  const toastTemplate = document.querySelector(`#${templateId}`).content.querySelector(`.${mainClass}`);
  const toast = toastTemplate.cloneNode(true);
  const toastButton = toast.querySelector('button');
  const bodyElement = document.querySelector('body');

  const onEscButtonPress = (evt) => {
    if (evt.key === 'Escape') {
      closeToast();
    }
  };

  function closeToast() {
    toast.remove();
    document.removeEventListener('keydown', onEscButtonPress);
    onClose();
  }

  bodyElement.insertAdjacentElement('beforeend', toast);

  if (closeAfter) {
    setTimeout(() => {
      closeToast();
    }, closeAfter * 1000);
    return;
  }

  toastButton.addEventListener('click', () => {
    closeToast();
  });

  toast.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(mainClass)) {
      closeToast();
    }
  });

  document.addEventListener('keydown', onEscButtonPress);
}
