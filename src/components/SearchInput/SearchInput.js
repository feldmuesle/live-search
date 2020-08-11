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
  handleChange,
  node,
  handleSelect,
  resultComponent,
}) {
  const ResultComponent = resultComponent;
  const classNames = className ? `search-input ${className}` : 'search-input';

  function createDropdown() {
    return (
      <div className="search-input__dropdown" ref={node}>
        <ul className="search-input__results">
          {data.map((item) => {
            const { id } = item;

            return (
              <li
                className="search-input__result-item"
                onMouseDown={() => handleSelect(item)}
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

    return (
      <FontAwesomeIcon
        icon="chevron-down"
        className="search-input__icon search-input__icon--closed"
      />
    );
  }

  return (
    <div className={classNames}>
      <FormItem label="Manager">
        <Input
          autoComplete="new-password"
          value={value}
          placeholder="Choose Manager"
          name="managers"
          onChange={handleChange}
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
  handleChange: PropTypes.func.isRequired,
  node: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  handleSelect: PropTypes.func.isRequired,
  resultComponent: PropTypes.func.isRequired,
};

export default SearchInput;
