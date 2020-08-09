/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

function SearchInputContainer({ data, getResult, formatSelection, resultComponent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [result, setResult] = useState(data);
  const node = useRef();

  const search = (ev) => {
    const searchTerm = ev.target.value;
    const searchResult = getResult(data, searchTerm);

    setValue(searchTerm);
    setResult(searchResult);
  };

  const handleSelect = (item) => {
    setValue(formatSelection(item));
    toggleDropdown();
  };

  const handleFocus = (ev) => {
    // hush Chromes autosuggest feature
    ev.target.setAttribute('autocomplete', 'off');
    toggleDropdown();
  };

  const handleBlur = (ev) => {
    ev.stopPropagation();

    if (isOpen && !node.current.contains(ev.target)) {
      toggleDropdown();

      return null;
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleBlur);

    return () => {
      document.removeEventListener('mousedown', handleBlur);
    };
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <SearchInput
      data={result}
      value={value}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      search={search}
      handleSelect={handleSelect}
      resultComponent={resultComponent}
      node={node}
    />
  );
}

SearchInputContainer.defaultProps = {};

SearchInputContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  getResult: PropTypes.func.isRequired,
};

export default SearchInputContainer;
