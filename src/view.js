import onChange from 'on-change';
import validationСhecks from './url-validation.js';

const init = () => {
  const form = document.querySelector('.rss-form');
  const feedback = document.querySelector('.feedback');
  const input = form.querySelector('.form-control');

  const state = {
    receivingData: 'filling',
    url: [],
  }

  const watchedState = onChange(state, (path) => {
    if (path === 'receivingData' && state.receivingData === 'failed') {
      feedback.textContent = 'Ссылка должна быть валидным урлом';
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      input.classList.add('is-invalid');
    };

    if (path === 'receivingData' && state.receivingData === 'repeat') {
      feedback.textContent = 'RSS уже существует';
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      input.classList.add('is-invalid');
    };

    if (path === 'receivingData' && state.receivingData === 'finished') {
      feedback.textContent = 'RSS успешно загружен';
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

    new Promise(() => {
      validationСhecks(url)
        .then((response) => {
          if(!response) {
            watchedState.receivingData = 'failed';
            return;
          }
          if (сheckLinkToRequest(url)) {
            watchedState.receivingData = 'repeat';
            return;
          } else {
            watchedState.url.push(url);
            watchedState.receivingData = 'finished';
          }
        })
    });
  });
}

export default init;
