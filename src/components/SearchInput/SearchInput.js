/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '../FormItem';
import { Input } from '../Input';
import './index.css';

function SearchInput({
  className,
  data,
  value,
  isOpen,
  toggleDropdown,
  search,
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
            return (
              <li
                className="search-input__result-item"
                onClick={selectResult}
                data-id={item.id}
                key={item.id}
              >
                <ResultComponent {...item} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className={classNames}>
      <FormItem label="Manager">
        <Input
          value={value}
          placeholder="Choose Manager"
          name="managers"
          onChange={search}
          onFocus={toggleDropdown}
          onBlur={null}
        />
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
  toggleDropdown: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  selectResult: PropTypes.func.isRequired,
  resultComponent: PropTypes.node.isRequired,
};

export default SearchInput;
