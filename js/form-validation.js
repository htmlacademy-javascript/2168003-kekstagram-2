import { arrayHasDuplicates, removeExceedingSpaces } from './util.js';

const uploadInput = document.querySelector('.img-upload__input');
const overlayModal = document.querySelector('.img-upload__overlay');
const closeOverlayButton = overlayModal.querySelector('.img-upload__cancel');
const bodyElement = document.querySelector('body');
const imageForm = document.querySelector('.img-upload__form');
const hashtagsField = imageForm.querySelector('.text__hashtags');
const descriptionField = imageForm.querySelector('.text__description');
const sendButton = imageForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

export const validateUploadForm = () => {
  function removeListeners() {
    document.removeEventListener('keydown', onEscButtonPress);
    closeOverlayButton.removeEventListener('click', onCloseButtonClick);
    hashtagsField.removeEventListener('input', onTextFieldChange);
    descriptionField.removeEventListener('input', onTextFieldChange);
  }

  function clearFields() {
    uploadInput.value = null;
    hashtagsField.value = null;
    descriptionField.value = null;
  }

  function hideModal() {
    overlayModal.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }

  function resetUploadForm() {
    hideModal();
    pristine.reset();
    clearFields();
    removeListeners();
  }

  function onCloseButtonClick() {
    resetUploadForm();
  }

  function onEscButtonPress(evt) {
    if (evt.key === 'Escape') {
      const textFieldIsSelected = document.activeElement.parentElement.classList.contains('img-upload__field-wrapper');
      if (!textFieldIsSelected) {
        resetUploadForm();
      }
    }
  }

  uploadInput.addEventListener('change', () => {
    if (uploadInput.files.length > 0) {
      overlayModal.classList.remove('hidden');

      bodyElement.classList.add('modal-open');

      closeOverlayButton.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscButtonPress);

      hashtagsField.addEventListener('input', onTextFieldChange);
      descriptionField.addEventListener('input', onTextFieldChange);
    }
  });

  const getArrayHashtagsFromString = (str) => removeExceedingSpaces(str).length > 0 ? removeExceedingSpaces(str).toLowerCase().split(' ') : [];

  pristine.addValidator(hashtagsField, (value) => {
    const allWords = getArrayHashtagsFromString(value);

    if (arrayHasDuplicates(allWords)) {
      return false;
    }

    return true;
  }, 'Нельзя один и тот же хештег использовать дважды');

  pristine.addValidator(hashtagsField, (value) => {
    const allWords = getArrayHashtagsFromString(value);

    if (allWords.length > 5) {
      return false;
    }

    return true;
  }, 'Нельзя использовать больше 5 хештегов');

  pristine.addValidator(hashtagsField, (value) => {
    const allWords = getArrayHashtagsFromString(value);

    if (allWords.length > 0) {
      const regRule = /^#[a-zа-я0-9]{1,19}$/;

      for (let i = 0; i < allWords.length; i++) {
        if (!allWords[i].match(regRule)) {
          return false;
        }
      }
    }

    return true;
  }, 'Хештеги должны начинаться с знака #, разделяться пробелами, содержать только буквы и цифры и содержать хотя бы один символ, но не больше 20 символов (включая знак #)');

  pristine.addValidator(descriptionField, (value) => {
    if (value.length > 140) {
      return false;
    }

    return true;
  }, 'Длина комментария не должна превышать 140 символов');

  function onTextFieldChange() {
    const isFormValid = pristine.validate();
    if (!isFormValid) {
      sendButton.disabled = true;
      sendButton.classList.add('img-upload__submit--disabled');
    } else {
      sendButton.disabled = false;
      sendButton.classList.remove('img-upload__submit--disabled');
    }
  }

};
