import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().required().url(),
});

const validationСhecks = (url) => {
  return schema
    .isValid({
      url: url,
    })
    .then((valid) => {
      return valid;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export default validationСhecks;
