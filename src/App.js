import React from 'react';
import setupIcons from './setup-icons';
import getData from './api/get-data';
import './App.css';

setupIcons();

const managers = getData().data;
console.log('managers', managers);

function App() {
  return <div className="App">Exiting stuff to come...</div>;
}

export default App;
