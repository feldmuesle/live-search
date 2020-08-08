/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import ManagerResult from '../results/mangers';

function SearchInputContainer({ data }) {
  const displayAll = () => {};

  const search = () => {};

  const selectResult = () => {};

  return (
    <SearchInput
      data={data}
      displayAll={displayAll}
      search={search}
      selectResult={selectResult}
      resultComponent={ManagerResult}
    />
  );
}

SearchInputContainer.defaultProps = {};

SearchInputContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf([PropTypes.string, PropTypes.object, PropTypes.array])
  ).isRequired,
};

export default SearchInputContainer;
