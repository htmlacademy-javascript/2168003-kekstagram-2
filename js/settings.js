// * API SETTINGS * //
const API_POINT = 'https://31.javascript.htmlacademy.pro/kekstagram';
const API_ROUTES = {
  GET: '/data',
  SEND: '/'
};
const API_METHODS = {
  GET: 'GET',
  SEND: 'POST'
};

const RERENDER_DELAY = 0.5;
const DEFAULT_DEBOUNCE_DELAY = 0.5;
const AMOUNT_OF_POSTS = 25;
const AMOUNT_OF_RANDOM_POSTS = 10;
const MILISECONDS_IN_SECOND = 1000;

// * SINGULAR COMMENT LIMITS * //

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

// * SIGNILAR POST LIMITS * //

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const ALLOWED_EXTENSIONS = [
  'webp',
  'jpeg',
  'jpg',
  'png',
  'avif'
];

const AMOUNT_OF_COMMENTS_PER_LOAD = 5;
const SCALE_STEP = 25, SCALE_MAX = 100, SCALE_MIN = 25;
const FILTERS = {
  'chrome': {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1
  },
  'sepia': {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1
  },
  'marvin': {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    symbol: '%'
  },
  'phobos': {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    symbol: 'px'
  },
  'heat': {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1
  },
  'none': {
    name: 'none'
  }
};


export {
  API_POINT,
  API_ROUTES,
  API_METHODS,
  MAX_HASHTAGS,
  MAX_COMMENT_LENGTH,
  RERENDER_DELAY,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
  MILISECONDS_IN_SECOND,
  DEFAULT_DEBOUNCE_DELAY,
  AMOUNT_OF_POSTS,
  AMOUNT_OF_RANDOM_POSTS,
  ALLOWED_EXTENSIONS,
  AMOUNT_OF_COMMENTS_PER_LOAD,
  SCALE_STEP,
  SCALE_MAX,
  SCALE_MIN,
  FILTERS
};
