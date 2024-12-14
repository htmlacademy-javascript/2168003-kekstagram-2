import { getPosts } from './get-posts';

export const displayPosts = (amountOfPosts) => {

  const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const postsFragment = document.createDocumentFragment();

  const posts = getPosts(amountOfPosts);

  posts.forEach(({ url, description, likes, comments }) => {
    const postFragment = postTemplate.cloneNode(true);

    const imageElement = postFragment.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;

    const likesElement = postFragment.querySelector('.picture__likes');
    likesElement.textContent = likes;

    const commentsElement = postFragment.querySelector('.picture__comments');
    commentsElement.textContent = comments.length;

    postsFragment.append(postFragment);
  });

  const picturesElement = document.querySelector('.pictures');
  picturesElement.append(postsFragment);
};
