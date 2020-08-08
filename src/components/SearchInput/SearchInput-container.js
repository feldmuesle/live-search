/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import ManagerResult from './templates/manager';
import './templates/manager.css';

function SearchInputContainer({ data, getResult }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [result, setResult] = useState(data);

  const search = (ev) => {
    const searchTerm = ev.target.value;
    const searchResult = getResult(data, searchTerm);

    setValue(searchTerm);
    setResult(searchResult);
  };

  const selectResult = () => {};

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <SearchInput
      data={result}
      value={value}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      search={search}
      selectResult={selectResult}
      resultComponent={ManagerResult}
    />
  );
}

SearchInputContainer.defaultProps = {};

SearchInputContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  getResult: PropTypes.func.isRequired,
};

export default SearchInputContainer;
