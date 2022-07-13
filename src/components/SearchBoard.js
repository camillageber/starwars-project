import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchBoard() {
  const { handleFilterPlanets, getPlanetsData } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanetsData();
  }, []);

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
