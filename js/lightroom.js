import { ALLOWED_EXTENSIONS } from './settings';
import { createCommentTemplate } from './util';

export const lightroom = (posts) => {
  const bigPictureElement = document.querySelector('.big-picture');

  // ---
  // HELPERS
  // ---

  function setBigPictureData({ url, comments, likes }) {
    const imageElement = bigPictureElement.querySelector('.big-picture__img img');
    const likesElement = bigPictureElement.querySelector('.likes-count');
    const commentsShownAmountElement = bigPictureElement.querySelector('.social__comment-shown-count');
    const commentsTotalAmountElement = bigPictureElement.querySelector('.social__comment-total-count');
    const commentsListElement = bigPictureElement.querySelector('.social__comments');

    imageElement.src = url;
    likesElement.textContent = likes;

    commentsTotalAmountElement.textContent = comments.length;


    // START OF TEMP AREA
    commentsShownAmountElement.textContent = comments.length;

    const commentsShownElement = bigPictureElement.querySelector('.social__comment-count');
    const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
    if (!commentsShownElement.classList.contains('hidden')) {
      commentsShownElement.classList.add('hidden');
      commentsLoaderElement.classList.add('hidden');
    }
    // END OF TEMP AREA

    commentsListElement.innerHTML = '';
    const commentsListFragment = document.createDocumentFragment();
    const commentTemplate = createCommentTemplate();

    if (comments.length > 0) {
      comments.forEach(({ avatar, message, name }) => {
        const commentFragment = commentTemplate.cloneNode(true);

        const commentImageElement = commentFragment.querySelector('.social__picture');
        commentImageElement.src = avatar;
        commentImageElement.alt = name;

        const commentTextElement = commentFragment.querySelector('.social__text');
        commentTextElement.textContent = message;

        commentsListFragment.append(commentFragment);
      });

      commentsListElement.append(commentsListFragment);
    } else {
      const commentFragment = commentTemplate.cloneNode(true);

      commentsListFragment.append(commentFragment);
      commentsListElement.append(commentsListFragment);
    }

  }

  function getPostByImageSource(src) {
    const regExpId = new RegExp(`/[0-9a-zA-Z]+.(${ALLOWED_EXTENSIONS.join('|')})$`, 'g');

    const postId = parseInt(src.match(regExpId)[0].split('.')[0].split('/')[1], 10);
    const postData = posts.find((post) => post.id === postId);

    return postData;
  }

  function onModalOutsideAreaClick (evt) {
    if (evt.target.classList.contains('overlay')) {
      bigPictureElement.classList.add('hidden');
      document.body.classList.remove('modal-open');

      document.removeEventListener('keydown', onEscapePress);
      bigPictureElement.removeEventListener('click', onModalCloseButtonClick);
      bigPictureElement.removeEventListener('click', onModalOutsideAreaClick);
    }
  }

  function onModalCloseButtonClick () {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onEscapePress);
    bigPictureElement.removeEventListener('click', onModalCloseButtonClick);
    bigPictureElement.removeEventListener('click', onModalOutsideAreaClick);
  }

  function onEscapePress (evt) {
    if (evt.key === 'Escape') {
      if (!bigPictureElement.classList.contains('hidden')) {
        bigPictureElement.classList.add('hidden');
        document.body.classList.remove('modal-open');

        document.removeEventListener('keydown', onEscapePress);
        bigPictureElement.removeEventListener('click', onModalCloseButtonClick);
        bigPictureElement.removeEventListener('click', onModalOutsideAreaClick);
      }
    }
  }

  // ---
  // LISTEN TO CLICKS AND OPEN MODAL
  // ---

  const imagesContainer = document.querySelector('.pictures');

  imagesContainer.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('a.picture');

    if (thumbnailElement) {
      evt.preventDefault();
      bigPictureElement.classList.remove('hidden');

      const pictureElement = thumbnailElement.querySelector('.picture__img');
      const postData = getPostByImageSource(pictureElement.src);
      setBigPictureData(postData);

      document.body.classList.add('modal-open');

      const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
      bigPictureElement.addEventListener('click', onModalOutsideAreaClick);
      closeButton.addEventListener('click', onModalCloseButtonClick);
      document.addEventListener('keydown', onEscapePress);
    }
  });
};
