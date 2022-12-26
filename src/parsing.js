import axios from 'axios';

const data = {
  id: 0,
}

const createIdForFeed = () => {
  return data.id += 1;
}

const extractDataAndStandStructure = (document) => {
  if (!document.querySelector('channel')) { return [] };

  const channel = document.querySelector('channel');
  const items = channel.querySelectorAll('item');
  const posts = [];
  const feed = [];

  feed.push({
    id: data.id,
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  });

  items.forEach((item, index) => {
    posts.push({
      id: index,
      idFeed: data.id,
      link: item.querySelector('link').textContent,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
    })
  })

  createIdForFeed();
  return([feed, posts]);
}

const parsingReceivedData = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "application/xml");
  return doc;
}

const createLinkDownloadStream = (link) => {
  return `https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`;
}

const parsing = (link) => {
  const url = createLinkDownloadStream(link);

  return axios.get(url)
    .then((response) => {
      const doc = parsingReceivedData(response.data.contents);
      return [extractDataAndStandStructure(doc), response.status];
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export default parsing;
