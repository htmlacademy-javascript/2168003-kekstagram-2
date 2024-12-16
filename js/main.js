import { displayPosts } from './display-posts.js';
import { getPosts } from './get-posts.js';
import { AMOUNT_OF_POSTS } from './settings.js';

const posts = getPosts(AMOUNT_OF_POSTS);
displayPosts(posts);
