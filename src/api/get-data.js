/* eslint-disable import/no-named-default */

import { default as dummyData } from './data.json';

const getData = () => {
  const url =
    'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

  /* temporarily until we've developed the drowdown' */
  return dummyData;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
};

export default getData;
