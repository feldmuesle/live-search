import getData from './get-data';

const getManagers = () => {
  const url =
    'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';
  const data = getData(url);

  return format(data);
};

function getEmailById(id, accounts) {
  const manager = accounts.find((account) => {
    return account.id === id;
  });

  const email = manager ? manager.attributes.email : null;

  return email;
}

function getAccountId(data) {
  const accountId = data.relationships.account.data.id;

  return accountId;
}

function format(managers) {
  return managers.data.map((manager) => {
    const accountId = getAccountId(manager);
    const email = getEmailById(accountId, managers.included);
    const { firstName, lastName } = manager.attributes;
    const { id } = manager;

    return { email, firstName, lastName, id };
  });
}

export default getManagers;
