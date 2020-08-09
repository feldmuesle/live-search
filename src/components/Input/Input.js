import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Input({
  autoComplete,
  type,
  name,
  onChange,
  onBlur,
  onFocus,
  value,
  placeholder,
  className,
  isRequired,
}) {
  const classNames = className ? `input ${className}` : 'input';

  return (
    <input
      autoComplete={autoComplete}
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      placeholder={placeholder}
      className={classNames}
      required={isRequired}
    />
  );
}

Input.defaultProps = {
  autoComplete: 'true',
  type: 'text',
  placeholder: null,
  className: null,
  onChange: null,
  onBlur: null,
  onFocus: null,
  isRequired: false,
};

Input.propTypes = {
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
