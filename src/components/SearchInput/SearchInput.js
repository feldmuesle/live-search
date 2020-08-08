/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '../FormItem';
import { Input } from '../Input';
import './index.css';

function SearchInput({
  className,
  data,
  isOpen,
  toggleDropdown,
  search,
  displayAll,
  selectResult,
  resultComponent,
}) {
  const classNames = className ? `search-input ${className}` : 'search-input';

  const ResultComponent = resultComponent;

  function createDropdown() {
    return (
      <div className="search-input__dropdown">
        <ul className="search-input__results">
          {data.map((manager) => {
            const { firstName, lastName, email, id } = manager;

            return (
              <li className="search-input__result-item">
                <ResultComponent
                  firstname={firstName}
                  lastname={lastName}
                  email={email}
                  id={id}
                />
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
          placeholder="Choose Manager"
          name="managers"
          onChange={search}
          onFocus={toggleDropdown}
          onBlur={toggleDropdown}
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
  isOpen: PropTypes.bool,
  toggleDropdown: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  displayAll: PropTypes.func.isRequired,
  selectResult: PropTypes.func.isRequired,
  resultComponent: PropTypes.node.isRequired,
};

export default SearchInput;
