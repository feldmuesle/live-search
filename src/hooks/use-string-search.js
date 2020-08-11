const getResult = (data, keys, value) => {
  const searchTerm = value.replace(/\s+/g, '');

  // let user type at least two characters before searching
  if (searchTerm.length >= 1) {
    const regex = new RegExp(`${searchTerm}`, 'i');

    return data.filter((item) => {
      const searchString = keys.reduce((string, key) => {
        return string.concat(item[key].toLowerCase());
      }, '');

      return regex.test(searchString);
    });
  }

  return data;
};

const useStringSearch = (keys) => {
  const searchResult = (data, value) => getResult(data, keys, value);

  return searchResult;
};

export default useStringSearch;
