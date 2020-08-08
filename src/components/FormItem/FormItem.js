/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function FormItem({ className, label, children }) {
  const classNames = className ? `form-item ${className}` : 'form-item';

  if (label) {
    return (
      <div className={classNames}>
        {label ? (
          <label className="form-item__label">
            {`${label}:`}
            {children}
          </label>
        ) : (
          { children }
        )}
      </div>
    );
  }

  return <div className={classNames}>{children}</div>;
}

FormItem.defaultProps = {
  className: null,
  label: null,
};

FormItem.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormItem;
