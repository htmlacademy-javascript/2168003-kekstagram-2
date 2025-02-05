import { API_METHODS, API_POINT, API_ROUTES } from './settings.js';

function sendApiRequest(route, errorText = 'API request error', {
  method = API_METHODS.GET,
  body = null,
  onError = () => { },
  onSuccess = () => { }
} = {}) {
  return fetch(`${API_POINT}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
}

export function loadPosts(
  {
    onSuccess = () => { },
    onError = () => { }
  } = {}) {
  return sendApiRequest(API_ROUTES.GET, 'Loading posts from the server failed', {
    onSuccess: onSuccess,
    onError: onError
  });
}

export function sendPost(post, {
  onSuccess = () => { },
  onError = () => { }
} = {}) {
  return sendApiRequest(API_ROUTES.SEND, 'Sending a post failed', {
    onError: onError,
    onSuccess: onSuccess,
    body: post,
    method: API_METHODS.SEND
  });
}
