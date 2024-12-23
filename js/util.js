export function generateUniqueId () {
  let currentId = 0;

  return function () {
    currentId++;
    return currentId;
  };
}

export function counter (start, end, step) {
  let current = start;

  return function () {
    if (end - current > step) {
      current += step;
    } else {
      current = end;
    }
    return current;
  };
}

export function getRandomPositiveIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * array.length)];
}
