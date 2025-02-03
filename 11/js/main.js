import { displayPosts } from './display-posts.js';
import { lightroom } from './lightroom.js';
import { AMOUNT_OF_POSTS } from './settings.js';
import { validateUploadForm } from './form-validation.js';
import { loadPosts } from './api.js';
import { showToast } from './toasts.js';

loadPosts({
  onError: () => showToast('data-error', 'data-error', { closeAfter: 5 }),
  onSuccess: (data) => {
    const posts = data.slice(0, AMOUNT_OF_POSTS);
    displayPosts(posts);
    lightroom(posts);
    validateUploadForm();
  }
});
