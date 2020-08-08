import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Input({ type, name, onChange, onBlur, value, placeholder, className, isRequired }) {

  const classNames = className ? `input ${className}` : 'input';

  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      className={classNames}
      required={isRequired}
    />
  );
}

Input.defaultProps = {
  type: 'text',
  placeholder: null,
  className: null,
  isRequired: false,
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
