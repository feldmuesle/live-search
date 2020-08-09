/* eslint-disable import/no-named-default */

import { default as dummyData } from './data.json';

const getData = (url) => {
  /* temporarily until we've developed the drowdown' */
  // return dummyData;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};

export default getData;
