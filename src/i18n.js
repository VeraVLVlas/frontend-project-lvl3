import i18n from 'i18next';

const initLibrary = (resources) => {
  const i18nInstance = i18n.createInstance();

  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  return i18nInstance;
}

export default initLibrary;
