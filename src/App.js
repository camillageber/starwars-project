import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import SearchBoard from './components/SearchBoard';

function App() {
  return (
    <PlanetsProvider>
      <SearchBoard />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
