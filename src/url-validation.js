import * as yup from 'yup';

yup.setLocale({
  string: {
    url: 'state_form.invalid_url',
  }
});

const schema = yup.object().shape({
  url: yup.string().required().url(),
});

const validationСhecks = (url) => {
  let message = '';

  return schema
    .validate({
      url: url,
    })
    .then((valid) => {
      return valid;
    })
    .catch((error) => {
      error.errors.map((err) => {
        return message = err;
      })
      return message;
    });
}

export default validationСhecks;
