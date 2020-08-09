/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormItem } from '../FormItem';
import { Input } from '../Input';
import './index.css';

function SearchInput({
  className,
  data,
  value,
  isOpen,
  handleFocus,
  handleBlur,
  search,
  node,
  selectResult,
  resultComponent,
}) {
  const ResultComponent = resultComponent;
  const classNames = className ? `search-input ${className}` : 'search-input';

  function createDropdown() {
    return (
      <div className="search-input__dropdown">
        <ul className="search-input__results">
          {data.map((item) => {
            const { id } = item;

            return (
              <li
                className="search-input__result-item"
                onClick={(ev) => selectResult(item)}
                key={id}
              >
                <ResultComponent {...item} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  function getIcon() {
    if (isOpen) {
      return <FontAwesomeIcon icon="chevron-up" className="search-input__icon" />;
    }

    return <FontAwesomeIcon icon="chevron-down" className="search-input__icon" />;
  }

  return (
    <div className={classNames} ref={node}>
      <FormItem label="Manager">
        <Input
          autoComplete="new-password"
          value={value}
          placeholder="Choose Manager"
          name="managers"
          onChange={search}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {getIcon()}
      </FormItem>
      {isOpen && createDropdown()}
    </div>
  );
}

SearchInput.defaultProps = {
  className: null,
  isOpen: false,
};

SearchInput.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string, PropTypes.object, PropTypes.array)
  ).isRequired,
  value: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  selectResult: PropTypes.func.isRequired,
  resultComponent: PropTypes.node.isRequired,
};

export default SearchInput;
