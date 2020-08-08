import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Initials({ firstname, lastname }) {
  function returnInitial(string) {
    return string.charAt(0).toUpperCase();
  }

  return (
    <div className="initials">
      {`${returnInitial(firstname)}${returnInitial(lastname)}`}
    </div>
  );
}

Initials.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
};

export default Initials;
