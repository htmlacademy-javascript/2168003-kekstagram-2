import { ALLOWED_EXTENSIONS, AMOUNT_OF_COMMENTS_PER_LOAD } from './settings.js';
import { counter } from './util.js';

export const lightroom = (posts) => {
  const bigPictureElement = document.querySelector('.big-picture');

  // ---
  // HELPERS
  // ---

  function createCommentTemplate() {
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

  function displayComments ({comments}) {
    const loadMoreCommentsButton = bigPictureElement.querySelector('.social__comments-loader');
    const increaseAmountOfComments = counter(0, comments.length, AMOUNT_OF_COMMENTS_PER_LOAD);
    let amountOfShownComments = 0;

    const renderComments = (commentsList, amount) => {
      const commentsShownAmountElement = bigPictureElement.querySelector('.social__comment-shown-count');
      const commentsTotalAmountElement = bigPictureElement.querySelector('.social__comment-total-count');
      const commentsListElement = bigPictureElement.querySelector('.social__comments');
      const totalComments = comments.length;

      commentsListElement.innerHTML = '';
      const commentsListFragment = document.createDocumentFragment();
      const commentTemplate = createCommentTemplate();

      commentsTotalAmountElement.textContent = totalComments;

      const commentsListToShow = commentsList.slice(0, amount);

      commentsShownAmountElement.textContent = amount;
      commentsListToShow.forEach(({ avatar, message, name }) => {
        const commentFragment = commentTemplate.cloneNode(true);

        const commentImageElement = commentFragment.querySelector('.social__picture');
        commentImageElement.src = avatar;
        commentImageElement.alt = name;

        const commentTextElement = commentFragment.querySelector('.social__text');
        commentTextElement.textContent = message;

        commentsListFragment.append(commentFragment);
      });

      commentsListElement.append(commentsListFragment);
    };

    const loadMoreComments = () => {
      amountOfShownComments = increaseAmountOfComments();
      renderComments(comments, amountOfShownComments);
    };

    loadMoreComments(); // first batch load

    loadMoreCommentsButton.addEventListener('click', loadMoreComments);
  }

  function setBigPictureData({ url, likes }) {
    const imageElement = bigPictureElement.querySelector('.big-picture__img img');
    const likesElement = bigPictureElement.querySelector('.likes-count');

    imageElement.src = url;
    likesElement.textContent = likes;
  }

  function getPostIdByImageSource(src) {
    const regExpId = new RegExp(`/[0-9a-zA-Z]+.(${ALLOWED_EXTENSIONS.join('|')})$`, 'g');

    const postId = parseInt(src.match(regExpId)[0].split('.')[0].split('/')[1], 10);

    return postId;
  }

  function getPostByImageSource(src) {
    const postId = getPostIdByImageSource(src);
    const postData = posts.find((post) => post.id === postId);

    return postData;
  }

  function closeModal() {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  function removeModalListeners() {
    document.removeEventListener('keydown', onEscapePress);
    bigPictureElement.removeEventListener('click', onModalCloseButtonClick);


    const loadMoreCommentsButton = bigPictureElement.querySelector('.social__comments-loader');
    loadMoreCommentsButton.removeEventListener('click', onLoadMoreCommentsClick);
  }

  function onLoadMoreCommentsClick() {
    //loadMoreComments(); ???
  }

  function onModalCloseButtonClick() {
    closeModal();
    removeModalListeners();
  }

  function onEscapePress(evt) {
    if (evt.key === 'Escape') {
      closeModal();
      removeModalListeners();
    }
  }

  // ---
  // LISTEN TO CLICKS AND OPEN MODAL
  // ---

  const imagesContainer = document.querySelector('.pictures');

  imagesContainer.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('.picture');

    if (thumbnailElement) {
      evt.preventDefault();
      bigPictureElement.classList.remove('hidden');
      document.body.classList.add('modal-open');

      const pictureElement = thumbnailElement.querySelector('.picture__img');
      const postData = getPostByImageSource(pictureElement.src);

      setBigPictureData(postData);
      displayComments(postData);

      const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
      closeButton.addEventListener('click', onModalCloseButtonClick);
      document.addEventListener('keydown', onEscapePress);
    }
  });
};
