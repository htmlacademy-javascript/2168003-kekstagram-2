import { FILTERS, SCALE_MAX, SCALE_MIN, SCALE_STEP } from './settings.js';
import { arrayHasDuplicates, removeExceedingSpaces } from './util.js';

const uploadInput = document.querySelector('.img-upload__input');
const overlayModal = document.querySelector('.img-upload__overlay');
const closeOverlayButton = overlayModal.querySelector('.img-upload__cancel');
const bodyElement = document.querySelector('body');

const imageForm = document.querySelector('.img-upload__form');
const hashtagsField = imageForm.querySelector('.text__hashtags');
const descriptionField = imageForm.querySelector('.text__description');
const sendButton = imageForm.querySelector('.img-upload__submit');

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');
const filterContainer = document.querySelector('.img-upload__effect-level');
const filters = document.querySelectorAll('.effects__radio');
const filterValueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');


const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

export const validateUploadForm = () => {
  filterContainer.classList.add('hidden');
  noUiSlider.create(sliderElement, {
    step: 1,
    range: {
      min: 0,
      max: 100
    },
    start: 100
  });
  function removeListeners() {
    document.removeEventListener('keydown', onEscButtonPress);
    closeOverlayButton.removeEventListener('click', onCloseButtonClick);
    hashtagsField.removeEventListener('input', onTextFieldChange);
    descriptionField.removeEventListener('input', onTextFieldChange);
    uploadInput.removeEventListener('submit', onFormSubmit);
    smallerButton.removeEventListener('click', onSmallerButtonClick);
    biggerButton.removeEventListener('click', onBiggerButtonClick);

    for (let i = 0; i < filters.length; i++) {
      filters[i].removeEventListener('click', onFilterClick);
    }
    sliderElement.noUiSlider.disable();
  }

  function clearFields() {
    uploadInput.value = null;
    hashtagsField.value = null;
    descriptionField.value = null;
    filterContainer.classList.add('hidden');
    setScaleToValue(SCALE_MAX);
    imageElement.style.filter = null;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].value === 'none') {
        filters[i].checked = true;
      } else {
        filters[i].checked = false;
      }
    }
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

  function onFormSubmit(evt) {
    const isFormValid = pristine.validate();

    if (!isFormValid) {
      evt.preventDefault();
    }
  }

  function onSmallerButtonClick() {
    let currentValue = parseInt(scaleInput.value, 10);
    currentValue -= SCALE_STEP;
    if (currentValue < SCALE_MIN) {
      currentValue = SCALE_MIN;
    }
    setScaleToValue(currentValue);
  }

  function onBiggerButtonClick() {
    let currentValue = parseInt(scaleInput.value, 10);
    currentValue += SCALE_STEP;
    if (currentValue > SCALE_MAX) {
      currentValue = SCALE_MAX;
    }
    setScaleToValue(currentValue);
  }

  function setScaleToValue(value) {
    scaleInput.value = `${value}%`;
    imageElement.style.transform = `scale(${value / 100})`;
  }

  function onFilterClick(evt) {
    const chosenFilter = evt.target.value;

    if (chosenFilter === 'none') {
      filterContainer.classList.add('hidden');
      imageElement.style.filter = null;
    } else {
      filterContainer.classList.remove('hidden');
      const maxValue = FILTERS[chosenFilter].max, minValue = FILTERS[chosenFilter].min;
      imageElement.style.filter = `${FILTERS[chosenFilter].name}(${maxValue})`;

      const sliderSettings = {
        range: {
          'min': minValue,
          'max': maxValue,
        },
        step: FILTERS[chosenFilter].step
      };

      sliderElement.noUiSlider.updateOptions(sliderSettings);
      sliderElement.noUiSlider.set(maxValue);
    }
  }

  function onSliderMove() {
    const currentValue = sliderElement.noUiSlider.get();
    filterValueElement.value = currentValue;

    let chosenFilter;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].checked) {
        chosenFilter = filters[i].value;
      }
    }

    const specialSymbol = FILTERS[chosenFilter].symbol;
    imageElement.style.filter = specialSymbol ? `${FILTERS[chosenFilter].name}(${currentValue}${specialSymbol})` : `${FILTERS[chosenFilter].name}(${currentValue})`;
  }

  uploadInput.addEventListener('change', () => {
    if (uploadInput.files.length > 0) {
      overlayModal.classList.remove('hidden');
      bodyElement.classList.add('modal-open');

      closeOverlayButton.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscButtonPress);

      hashtagsField.addEventListener('input', onTextFieldChange);
      descriptionField.addEventListener('input', onTextFieldChange);

      uploadInput.addEventListener('submit', onFormSubmit);

      smallerButton.addEventListener('click', onSmallerButtonClick);
      biggerButton.addEventListener('click', onBiggerButtonClick);

      for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener('click', onFilterClick);
      }

      sliderElement.noUiSlider.on('update', onSliderMove);
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
