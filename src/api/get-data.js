/* eslint-disable import/no-named-default */

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};

export default getData;
