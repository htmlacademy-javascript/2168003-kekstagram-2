import { displayPosts } from './display-posts.js';
import { getPosts } from './get-posts.js';
import { lightroom } from './lightroom.js';
import { AMOUNT_OF_POSTS } from './settings.js';
import { validateUploadForm } from './form-validation.js';


const posts = getPosts(AMOUNT_OF_POSTS);
displayPosts(posts);
lightroom(posts);
validateUploadForm();
