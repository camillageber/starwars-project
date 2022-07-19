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
      {/* <select
        // onChange={ handleChange }
        name="column"
        data-testid="column-filter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        // onChange={ handleChange }
        name="comparision"
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        // onChange={ handleChange }
        value=""
        name="value"
        type="number"
        data-testid="value-filter"
      />
      <button
        // onClick={ handleClick }
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button> */}
    </div>
  );
}

export default SearchBoard;
