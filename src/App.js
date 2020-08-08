import React from 'react';
import setupIcons from './setup-icons';
import getManagers from './api/get-managers';
import { SearchInput } from './components/SearchInput';
import './App.css';

setupIcons();

const managers = getManagers();

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

  return data;
};

function App() {
  return (
    <div className="app">
      <SearchInput data={managers} getResult={getResult} />
    </div>
  );
}

export default App;
