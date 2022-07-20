import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import NumericsFilter from './NumericsFilter';

function SearchBoard() {
  const { handleFilterPlanets } = useContext(PlanetsContext);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Pesquise"
        onChange={ handleFilterPlanets }
      />
      <NumericsFilter />

    </div>
  );
}

export default SearchBoard;
