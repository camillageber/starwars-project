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
  const optionsArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [options, setOptions] = useState(optionsArray);

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

  useEffect(() => {
    setColumn(options[0]);
  }, [options]);

  const addFilter = () => {
    const filterMulti = options.filter((option) => option !== column);
    setOptions(filterMulti);
    const objFilter = {
      column,
      comparison,
      numericValue,
    };
    setFilterByNumericsValues([...filterByNumericsValues, objFilter]);
  };
  // ajuda para resolver o requisito 4 do André Horman na sala da monitoria
  // ajuda para construir o requisito 6 do colega Carlos Daniel na sala de estudos.
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
        { options.map((option) => <option key={ option }>{ option }</option>) }
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
