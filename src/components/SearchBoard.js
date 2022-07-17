import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchBoard() {
  const { handleFilterPlanets } = useContext(PlanetsContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        placeholder="Search"
        onChange={ handleFilterPlanets }
      />
    </div>
  );
}

export default SearchBoard;
