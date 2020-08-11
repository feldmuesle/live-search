/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import useKey from '../../hooks/use-key';

function SearchInputContainer({
  data,
  getResult,
  rowsToDisplay,
  formatSelection,
  resultComponent,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocussed, setIsFocussed] = useState(false);
  const [value, setValue] = useState('');
  const [result, setResult] = useState(data);
  const [navPointer, setNavPointer] = useState(null);
  const enter = useKey('enter');
  const arrowDown = useKey('arrowdown');
  const arrowUp = useKey('arrowup');
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
    setNavPointer(null);
    toggleDropdown();
  };

  const handleFocus = (ev) => {
    if (!isFocussed) setIsFocussed(true);
    // hush Chromes autosuggest feature
    ev.target.setAttribute('autocomplete', 'off');
    if (!isOpen) {
      toggleDropdown();
    }
  };

  const handleBlur = (ev) => {
    ev.stopPropagation();
    setIsFocussed(false);

    if (isOpen) {
      toggleDropdown();
      setNavPointer(null);
    }
  };

  function getRowsToDisplay() {
    if (navPointer !== null) {
      const resultLength = result.length;
      let sliceStart = navPointer === 0 ? 0 : navPointer - 1;
      let sliceEnd = navPointer === 0 ? rowsToDisplay : navPointer + 1;

      if (navPointer >= resultLength) {
        sliceStart = resultLength - rowsToDisplay;
        sliceEnd = resultLength;
      }

      return result.slice(sliceStart, sliceEnd);
    }

    return result;
  }

  /* keep search results updated */
  useEffect(() => {
    const currentResult = getResult(data, value);
    setResult(currentResult);
  }, [value]);

  /* handle enter key */
  useEffect(() => {
    if (enter) handleSelect(result[navPointer]);
  }, [enter]);

  /* handle arrowUp key event */
  useEffect(() => {
    if (!arrowUp) return;

    if (isFocussed) return;

    if (navPointer > 0) {
      const nextPointer = navPointer - 1;
      setNavPointer(nextPointer);
    }
  }, [arrowUp]);

  /* handle arrowDown key even */
  useEffect(() => {
    if (!arrowDown) return;

    if (isFocussed) {
      setNavPointer(0);
      setIsFocussed(false);

      return;
    }

    const maxPointer = result.length - 1;
    const nextPointer = navPointer < maxPointer ? navPointer + 1 : maxPointer;

    setNavPointer(nextPointer);
  }, [arrowDown]);

  /* handle click outside of dropdown */
  useEffect(() => {
    if (!node?.current) return;

    function handleClickOutside(ev) {
      ev.stopPropagation();
      if (!node?.current) return;
      if (isOpen && !node.current.contains(ev.target)) {
        setIsOpen(false);
        setNavPointer(null);
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
      data={getRowsToDisplay()}
      navPointer={navPointer}
      selectedId={result[navPointer]?.id}
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

SearchInputContainer.defaultProps = {
  rowsToDisplay: 2,
};

SearchInputContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  getResult: PropTypes.func.isRequired,
  rowsToDisplay: PropTypes.number,
  formatSelection: PropTypes.func.isRequired,
  resultComponent: PropTypes.func.isRequired,
};

export default SearchInputContainer;
