import i18next from './i18n.js';
import onChange from 'on-change';
import resources from '../locales/index.js';
import validationСhecks from './url-validation.js';
import parsing  from './parsing.js';
import contentRendering from './content-rendering.js';

const init = () => {
  const form = document.querySelector('.rss-form');
  const feedback = document.querySelector('.feedback');
  const input = form.querySelector('.form-control');
  const i18nInstance = i18next(resources);
  let message = '';

  const state = {
    receivingData: 'filling',
    url: [],
    feeds: [],
    posts: [],
  }

  const watchedState = onChange(state, (path, value) => {
    if (value === 'failed') {
      feedback.textContent = message;
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      input.classList.add('is-invalid');
    };

    if (value === 'repeat') {
      feedback.textContent = message;
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      input.classList.add('is-invalid');
    };

    if (value === 'finished') {
      contentRendering(state.feeds, state.posts, i18nInstance);
      feedback.textContent = message;
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      input.classList.remove('is-invalid');
      input.value = '';
      input.focus();
    };
  });

  const сheckLinkToRequest = (url) => {
    return state.url.includes(url);
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const url = formData.get('url');

    validationСhecks(url)
      .then((response) => {
        if(response.url !== url) {
          message = i18nInstance.t(response);
          watchedState.receivingData = 'failed';
          return;
        }
        if (сheckLinkToRequest(url)) {
          message = i18nInstance.t('state_form.existing_url');
          watchedState.receivingData = 'repeat';
          return;
        }
        parsing(url)
          .then((resources) => {
            const [data, status] = resources;
            if (status === 200 && data.length !== 0) {
              const [feed, posts] = data;
              console.log(feed, 'feed');
              watchedState.feeds.push(...feed);
              watchedState.posts.push(...posts);
              message = i18nInstance.t('state_form.success');
            } else if (status === 200 && data.length === 0) {
              message = i18nInstance.t('state_form.invalid_rss');
              watchedState.receivingData = 'failed';
              return;
            } else {
              message = i18nInstance.t('state_form.unknown_error');
              watchedState.receivingData = 'failed';
              return;
            }
            watchedState.url.push(url);
            watchedState.receivingData = 'finished';
          })
          .catch((error) => {
            message = i18nInstance.t('state_form.network_error');
            watchedState.receivingData = 'failed';
            throw new Error(error);
          });
        watchedState.receivingData = 'filling';
      })
  });
}

export default init;
