import { DUMMY_DESCRIPTIONS, DUMMY_COMMENTS, DUMMY_NAMES, DUMMY_SURNAMES } from './settings.js';
import { generateUniqueId, getRandomArrayElement, getRandomPositiveIntFromRange } from './util.js';

const getRandomDescription = () => {
  let description = '';

  Object.keys(DUMMY_DESCRIPTIONS).forEach((partName) => {
    const randomPart = getRandomArrayElement(DUMMY_DESCRIPTIONS[partName]);
    description += `${randomPart} `;
  });

  description = description[0].toUpperCase() + description.slice(1);
  return description.trimEnd();
};

const getPostId = generateUniqueId();
const getCommentId = generateUniqueId();

function getRandomPost () {
  const getRandomComment = () => {
    const commentId = getCommentId(),
      avatarId = getRandomPositiveIntFromRange(1, 6),
      message = getRandomArrayElement(DUMMY_COMMENTS),
      name = `${getRandomArrayElement(DUMMY_NAMES)} ${getRandomArrayElement(DUMMY_SURNAMES)}`;

    return {
      id: commentId,
      avatar: `img/avatar-${avatarId}.svg`,
      message: message,
      name: name
    };
  };

  const id = getPostId(),
    url = `photos/${id}.jpg`,
    description = getRandomDescription(),
    likes = getRandomPositiveIntFromRange(15, 200),
    amountOfComments = getRandomPositiveIntFromRange(0, 30),
    comments = Array.from({length: amountOfComments}, getRandomComment);

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments
  };

}

export const getPosts = (amount) => Array.from({length: amount}, getRandomPost);
