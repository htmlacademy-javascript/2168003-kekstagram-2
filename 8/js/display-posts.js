export const displayPosts = (posts) => {
  if (posts) {
    const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
    const postsFragment = document.createDocumentFragment();

    posts.forEach(({ url, description, likes, comments }) => {
      const postFragment = postTemplate.cloneNode(true);

      const imageElement = postFragment.querySelector('.picture__img');
      imageElement.src = url || '#';
      imageElement.alt = description || 'Без описания';

      const likesElement = postFragment.querySelector('.picture__likes');
      likesElement.textContent = likes || 0;

      const commentsElement = postFragment.querySelector('.picture__comments');
      commentsElement.textContent = comments?.length || 0;

      postsFragment.append(postFragment);
    });

    const picturesElement = document.querySelector('.pictures');
    picturesElement.append(postsFragment);
  } else {
    throw new Error('Posts were not passed to the displayPosts function');
  }
};