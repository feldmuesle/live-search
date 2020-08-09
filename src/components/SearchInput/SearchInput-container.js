/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

function SearchInputContainer({ data, getResult, formatSelection, resultComponent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [result, setResult] = useState(data);
  const node = useRef();

  const handleChange = (ev) => {
    const searchTerm = ev.target.value;
    setValue(searchTerm);

    if (!isOpen && result.length) {
      setIsOpen(true);
    }
  };

  const handleSelect = (item) => {
    setValue(formatSelection(item));
    toggleDropdown();
  };

  const handleFocus = (ev) => {
    // hush Chromes autosuggest feature
    ev.target.setAttribute('autocomplete', 'off');
    if (!isOpen) {
      toggleDropdown();
    }
  };

  const handleBlur = (ev) => {
    ev.stopPropagation();

    if (isOpen) {
      toggleDropdown();
    }
  };

  useEffect(() => {
    const currentResult = getResult(data, value);
    setResult(currentResult);
  }, [value]);

  useEffect(() => {
    if (!node?.current) return;

    function handleClickOutside(ev) {
      ev.stopPropagation();
      if (!node?.current) return;
      if (isOpen && !node.current.contains(ev.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    // eslint-disable-next-line consistent-return
    return () => {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

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
      handleChange={handleChange}
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
  formatSelection: PropTypes.func.isRequired,
  resultComponent: PropTypes.func.isRequired,
};

export default SearchInputContainer;
