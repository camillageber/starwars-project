import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericsFilter() {
  const { filterByNumericsValues, setDataPlanets,
    dataPlanets } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericValue, setNumericValue] = useState(0);

  const comparisonArray = ['maior que', 'menor que', 'igual a'];

  const handleFilterChange = ({ target }) => {
    switch (target.name) {
    case ('filterOptions'):
      return setColumn(target.value);
    case ('comparisonFilter'):
      return setComparison(target.value);
    case ('value-filter'):
      return setNumericValue(target.value);
    default:
      return console.log('error!');
    }
  };

  const handleFilterClick = () => {
    switch (comparison) {
    case (comparisonArray[0]): {
      const maiorQue = filterByNumericsValues
        .filter((planet) => planet[column] > Number(numericValue));
      return setDataPlanets(maiorQue); }
    case (comparisonArray[1]): {
      const menorQue = filterByNumericsValues
        .filter((planet) => planet[column] < Number(numericValue));
      return setDataPlanets(menorQue); }
    case (comparisonArray[2]): {
      const igual = filterByNumericsValues
        .filter((planet) => planet[column] === numericValue);
      return setDataPlanets(igual); }
    default:
      console.log(error);
    }
  };
  useEffect(() => {
    handleFilterClick();
  }, [dataPlanets]);

  return (
    <div>
      <select
        name="filterOptions"
        data-testid="column-filter"
        onChange={ handleFilterChange }
        value={ column }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>

      </select>
      <select
        name="comparisonFilter"
        data-testid="comparison-filter"
        onChange={ handleFilterChange }
        value={ comparison }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>

      </select>
      <input
        type="number"
        name="value-filter"
        data-testid="value-filter"
        min="0"
        value={ numericValue }
        onChange={ handleFilterChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        value="Filtrar"
        onClick={ handleFilterClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericsFilter;
