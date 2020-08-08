/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import { Initials } from '../../Initials';

function ManagerResult({ firstname, lastname, email }) {
  return (
    <React.Fragment>
      <Initials firstname={firstname} lastname={lastname} />
      <div className="manager-details">
        <div className="manager-detail--name">{`${firstname} ${lastname}`}</div>
        <div className="manager-detail--email">{email}</div>
      </div>
    </React.Fragment>
  );
}

ManagerResult.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ManagerResult;
