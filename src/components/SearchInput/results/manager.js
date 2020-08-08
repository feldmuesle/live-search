/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';

function ManagerResult({ firstname, lastname, email }) {
  return <div>manager list item to come</div>;
}

ManagerResult.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ManagerResult;
