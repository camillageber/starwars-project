import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericsFilter() {
  const { setCloneData, data } = useContext(PlanetsContext);
  // filterByNumericsValues, setDataPlanets, dataPlanets
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericValue, setNumericValue] = useState(0);
  const [filterByNumericsValues, setFilterByNumericsValues] = useState([]);

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
    let response = [...data];
    filterByNumericsValues.forEach((obj) => {
      switch (obj.comparison) {
      case (comparisonArray[0]): {
        response = response
          .filter((planet) => Number(planet[obj.column]) > Number(obj.numericValue));
        break;
      }
      case (comparisonArray[1]): {
        response = response
          .filter((planet) => Number(planet[obj.column]) < Number(obj.numericValue));
        break;
      }
      case (comparisonArray[2]): {
        response = response
          .filter((planet) => Number(planet[obj.column]) === Number(obj.numericValue));
        break;
      }
      default:
        response = data;
      }
    });
    setCloneData(response);
  };

  const addFilter = () => {
    const objFilter = {
      column,
      comparison,
      numericValue,
    };
    setFilterByNumericsValues([...filterByNumericsValues, objFilter]);
  };

  useEffect(() => {
    handleFilterClick();
    console.log('olá');
  }, [filterByNumericsValues]);

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
        onClick={ addFilter }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericsFilter;
