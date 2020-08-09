import React from 'react';
import setupIcons from './setup-icons';
import { ManagerLiveSearch } from './components/ManagerLiveSearch';
import './App.css';

setupIcons();

function App() {
  return (
    <div className="app">
      <ManagerLiveSearch />
    </div>
  );
}

export default App;
