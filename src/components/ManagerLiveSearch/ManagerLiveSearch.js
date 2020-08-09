import React, { useEffect, useState } from 'react';
import getData from '../../api/get-data';
import { SearchInput } from '../SearchInput';
import ManagerResultItem from './result-template/ManagerResultItem';

function ManagerLiveSearch() {
  const apiUrl =
    'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

  const [managers, setManagers] = useState([]);

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

  const getResult = (data, value) => {
    const searchTerm = value.replace(/\s+/g, '');

    // let user type at least two characters before searching
    if (searchTerm.length >= 2) {
      const regex = new RegExp(`${searchTerm}`, 'i');

      return data.filter(({ firstName, lastName }) => {
        const searchString = firstName.toLowerCase().concat(lastName.toLowerCase());

        return regex.test(searchString);
      });
    }

    return managers;
  };

  const formatSelection = ({ firstName, lastName }) => {
    return `${firstName} ${lastName}`;
  }

  if (managers.length) {
    return (
      <SearchInput
        data={managers}
        getResult={getResult}
        formatSelection={formatSelection}
        resultComponent={ManagerResultItem}
      />
    );
  }

  return null;
}

export default ManagerLiveSearch;
