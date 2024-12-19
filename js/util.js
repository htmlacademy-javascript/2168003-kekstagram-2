export function generateUniqueId () {
  let currentId = 0;

  return function () {
    currentId++;
    return currentId;
  };
}

export function getRandomPositiveIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function createCommentTemplate () {
  const template = document.createElement('li');
  template.classList.add('social__comment');

  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.width = 35;
  image.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = 'Ваш комментарий может быть первым!';

  template.append(image);
  template.append(text);

  return template;
}
