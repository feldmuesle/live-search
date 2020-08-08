import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Input({ type, name, onChange, onBlur, value, placeholder, isRequired }) {
  return (
    <div className="form__group">
      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  placeholder: null,
  isRequired: false,
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
