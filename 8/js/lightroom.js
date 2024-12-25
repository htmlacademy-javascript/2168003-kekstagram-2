import { ALLOWED_EXTENSIONS, AMOUNT_OF_COMMENTS_PER_LOAD } from './settings.js';

export const lightroom = (posts) => {
  const bigPictureElement = document.querySelector('.big-picture');
  const loadMoreCommentsButton = bigPictureElement.querySelector('.social__comments-loader');
  const imageElement = bigPictureElement.querySelector('.big-picture__img img');
  const commentsShownAmountElement = bigPictureElement.querySelector('.social__comment-shown-count');

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

  function setBigPictureData({ url, likes, comments, description }) {
    const likesElement = bigPictureElement.querySelector('.likes-count');
    const commentsTotalAmountElement = bigPictureElement.querySelector('.social__comment-total-count');
    const descriptionElement = bigPictureElement.querySelector('.social__caption');

    descriptionElement.textContent = description;
    imageElement.src = url;
    likesElement.textContent = likes;
    commentsTotalAmountElement.textContent = comments.length;
    commentsShownAmountElement.textContent = 0;
  }

  function renderComments(comments) {
    const commentsListElement = bigPictureElement.querySelector('.social__comments');

    commentsListElement.innerHTML = '';
    const commentsListFragment = document.createDocumentFragment();
    const commentTemplate = createCommentTemplate();


    comments.forEach(({ avatar, message, name }) => {
      const commentFragment = commentTemplate.cloneNode(true);

      const commentImageElement = commentFragment.querySelector('.social__picture');
      commentImageElement.src = avatar;
      commentImageElement.alt = name;

      const commentTextElement = commentFragment.querySelector('.social__text');
      commentTextElement.textContent = message;

      commentsListFragment.append(commentFragment);


      commentsShownAmountElement.textContent = comments.length;
    });

    commentsListElement.append(commentsListFragment);
  }

  function loadMoreComments() {
    const comments = getPostByImageSource(imageElement.src).comments;
    const oldAmount = parseInt(commentsShownAmountElement.textContent, 10);

    let newAmount = comments.length;
    if ((oldAmount + AMOUNT_OF_COMMENTS_PER_LOAD) < comments.length) {
      newAmount = oldAmount + AMOUNT_OF_COMMENTS_PER_LOAD;
    }

    const commentsListToShow = comments.slice(0, newAmount);
    renderComments(commentsListToShow);
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


    loadMoreCommentsButton.removeEventListener('click', onLoadMoreCommentsClick);
  }

  function onLoadMoreCommentsClick() {
    loadMoreComments();
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
      renderComments(postData.comments.slice(0, AMOUNT_OF_COMMENTS_PER_LOAD));

      const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
      closeButton.addEventListener('click', onModalCloseButtonClick);
      document.addEventListener('keydown', onEscapePress);

      loadMoreCommentsButton.addEventListener('click', onLoadMoreCommentsClick);
    }
  });
};
