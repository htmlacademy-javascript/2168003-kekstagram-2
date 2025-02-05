import { DEFAULT_DEBOUNCE_DELAY, MILISECONDS_IN_SECOND } from './settings.js';

export function generateUniqueId() {
  let currentId = 0;

  return function () {
    currentId++;
    return currentId;
  };
}

export function getRandomPositiveIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function arrayHasDuplicates(array) {
  const metElements = {};

  for (let i = 0; i < array.length; i++) {
    if (metElements[array[i]]) {
      return true;
    } else {
      metElements[array[i]] = true;
    }
  }

  return false;
}

export function removeExceedingSpaces(string) {
  const regex = /\s{2,}/g;
  return string.trim().replaceAll(regex, ' ');
}

export function shuffleArray (array) {
  const copyArray = array.slice();
  let amountOfRemaining = copyArray.length;

  while (amountOfRemaining) {
    const randomElement = Math.floor(Math.random() * amountOfRemaining);
    amountOfRemaining--;

    // And swap it with the current element.
    [copyArray[amountOfRemaining], copyArray[randomElement]] = [
      copyArray[randomElement], copyArray[amountOfRemaining]];
  }

  return copyArray;
}

export function debounce (cb, interval = DEFAULT_DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...rest), interval * MILISECONDS_IN_SECOND);
  };
}
