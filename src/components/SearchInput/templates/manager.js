/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import { Initials } from '../../Initials';

function ManagerResult({ firstName, lastName, email }) {
  return (
    <React.Fragment>
      <Initials firstname={firstName} lastname={lastName} />
      <div className="manager-details">
        <div className="manager-detail--name">{`${firstName} ${lastName}`}</div>
        <div className="manager-detail--email">{email}</div>
      </div>
    </React.Fragment>
  );
}

ManagerResult.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ManagerResult;
