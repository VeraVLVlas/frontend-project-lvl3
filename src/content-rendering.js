const createsMarkupForContent = (container, text) => {
  const markup = `
    <div class='card border-0'>
      <div class='card-body'><h2 class='card-title h4'>${text}</h2></div>
      <ul class="list-group border-0 rounded-0"></ul>
    </div>
  `;
  container.innerHTML = markup;
}

const renderPosts = (posts, i18nInstance) => {
  const container = document.querySelector('.posts');
  createsMarkupForContent(container, i18nInstance.t('page_content.posts'));
  const list = container.querySelector('.list-group');
  const textButton = i18nInstance.t('page_content.view_button');

  posts.map((post) => {
    list.insertAdjacentHTML('afterbegin',
      `<li class='list-group-item d-flex justify-content-between align-items-start border-0 border-end-0'>
        <a class="fw-bold" href='${post.link}' data-id='${post.id}' target='_blank' rel='noopener noreferrer'>${post.title}</a>
        <button type='button' class="btn btn-outline-primary btn-sm" data-id='${post.id}' data-bs-toggle="modal" data-bs-target="#modal">${textButton}</button>
      </li>`
    )
  });
}

const renderFeeds = (feeds, i18nInstance) => {
  const container = document.querySelector('.feeds');
  createsMarkupForContent(container, i18nInstance.t('page_content.feeds'));
  const list = container.querySelector('.list-group');

  feeds.map((feed) => {
    list.insertAdjacentHTML('afterbegin',
      `<li class="list-group-item border-0 border-end-0">
        <h3 class="h6 m-0">${feed.title}</h3>
        <p class="m-0 small text-black-50">${feed.description}</p>
      </li>`
    )
  });
}

const contentRendering = (feed, posts, i18nInstance) => {
  renderFeeds(feed, i18nInstance);
  renderPosts(posts, i18nInstance);
}

export default contentRendering;
