import React from 'react';
import setupIcons from './setup-icons';
import getData from './api/get-data';
import { SearchInput } from './components/SearchInput';
import './App.css';

setupIcons();

const managers = getData().data;
console.log('managers', managers);

function App() {
  return (
    <div className="app">
      <SearchInput data={managers} />
    </div>
  );
}

export default App;
