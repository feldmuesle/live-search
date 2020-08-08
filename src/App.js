import React from 'react';
import setupIcons from './setup-icons';
import getManagers from './api/get-managers';
import { SearchInput } from './components/SearchInput';
import './App.css';

setupIcons();

const managers = getManagers();

function App() {
  return (
    <div className="app">
      <SearchInput data={managers} getResult={() => {}} />
    </div>
  );
}

export default App;
