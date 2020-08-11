import React, { useEffect, useState } from 'react';
import getData from '../../api/get-data';
import { SearchInput } from '../SearchInput';
import ManagerResultItem from './result-template/ManagerResultItem';
import useStringSearch from '../../hooks/use-string-search';

function ManagerLiveSearch() {
  const apiUrl =
    'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

  const [managers, setManagers] = useState([]);
  const searchString = useStringSearch(['firstName', 'lastName']);

  useEffect(() => {
    if (!managers.length) {
      getData(apiUrl).then((data) => {
        const managerData = data.data.map((manager) => {
          const accountId = getAccountId(manager);
          const email = getEmailById(accountId, data.included);
          const { firstName, lastName } = manager.attributes;
          const { id } = manager;

          return { email, firstName, lastName, id };
        });
        setManagers(managerData);
      });
    }
  }, [managers]);

  function getEmailById(id, accounts) {
    const manager = accounts.find((account) => {
      return account.id === id;
    });

    const email = manager ? manager.attributes.email : null;

    return email;
  }

  function getAccountId(accountData) {
    const accountId = accountData.relationships.account.data.id;

    return accountId;
  }

  const formatSelection = ({ firstName, lastName }) => {
    return `${firstName} ${lastName}`;
  };

  if (managers.length) {
    return (
      <SearchInput
        data={managers}
        getResult={searchString}
        formatSelection={formatSelection}
        resultComponent={ManagerResultItem}
      />
    );
  }

  return null;
}

export default ManagerLiveSearch;
