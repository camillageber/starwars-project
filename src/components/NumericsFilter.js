import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericsFilter() {
  const { setCloneData, data, cloneData } = useContext(PlanetsContext);

  const optionsArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const comparisonArray = ['maior que', 'menor que', 'igual a'];

  const [doneFilters, setDoneFilters] = useState([]);
  const [options, setOptions] = useState(optionsArray);
  const [sorted] = useState(optionsArray);
  const [column1, setColumn1] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericValue, setNumericValue] = useState(0);
  const [filterByNumericsValues, setFilterByNumericsValues] = useState([]);
  const [sortPlanets, setSortPlanets] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleFilterChange = ({ target }) => {
    switch (target.name) {
    case ('filterOptions'):
      return setColumn1(target.value);
    case ('comparisonFilter'):
      return setComparison(target.value);
    default:
      return setNumericValue(target.value);
    }
  };

  const handleFilterClick = () => {
    let response = [...data];
    filterByNumericsValues.forEach((obj) => {
      switch (obj.comparison) {
      case (comparisonArray[0]): {
        response = response
          .filter((planet) => Number(planet[obj.column1]) > Number(obj.numericValue));
        break;
      }
      case (comparisonArray[1]): {
        response = response
          .filter((planet) => Number(planet[obj.column1]) < Number(obj.numericValue));
        break;
      }
      default:
        response = response
          .filter((planet) => Number(planet[obj.column1]) === Number(obj.numericValue));
        break;
      }
    });

    setCloneData(response);
  };

  useEffect(() => {
    setColumn1(options[0]);
  }, [options]);

  const addFilter = () => {
    const filterMulti = options.filter((option) => option !== column1);
    setOptions(filterMulti);
    const objFilter = {
      column1,
      comparison,
      numericValue,
    };
    setDoneFilters([...doneFilters, objFilter.column1]);
    setFilterByNumericsValues([...filterByNumericsValues, objFilter]);
  };

  useEffect(() => {
    handleFilterClick();
    // console.log('olá');
  }, [filterByNumericsValues]);

  const handleSortClick = () => {
    let sortedPlanets = [];

    if (sortColumn.sort === 'ASC') {
      const filterValue = cloneData.filter(
        (planet) => planet[sortColumn.column] !== 'unknown',
      );
      const sortedAscending = filterValue.sort(
        (a, b) => a[sortColumn.column] - b[sortColumn.column],
      );
      const lessFilter = cloneData.filter(
        (planet) => planet[sortColumn.column] === 'unknown',
      );
      sortedPlanets = [...sortedAscending, ...lessFilter];
    }

    if (sortColumn.sort === 'DESC') {
      const filterValue = cloneData.filter(
        (planet) => planet[sortColumn.column] !== 'unknown',
      );
      const sortedDescending = filterValue.sort(
        (a, b) => b[sortColumn.column] - a[sortColumn.column],
      );
      const lessFilter = cloneData.filter(
        (planet) => planet[sortColumn.column] === 'unknown',
      );
      sortedPlanets = [...sortedDescending, ...lessFilter];
    }

    setSortPlanets(sortedPlanets);
  };

  useEffect(() => {
    setCloneData(sortPlanets);
  }, [sortPlanets]);

  const handleSortChange = ({ target }) => {
    const { name, value } = target;
    setSortColumn({
      ...sortColumn, [name]: value,
    });
  };

  const filterTrash = (name) => {
    const numericValuesFiltered = filterByNumericsValues.filter(
      (filter) => filter.column1 !== name,
    );
    const removeDoneFilter = doneFilters.filter((filter) => filter !== name);
    setDoneFilters(removeDoneFilter);
    setOptions([...options, name]);
    setFilterByNumericsValues(numericValuesFiltered);
  };

  const filterTrashAll = () => {
    setDoneFilters([]);
    setOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
    setFilterByNumericsValues([]);
  };

  return (
    <div>
      <select
        name="filterOptions"
        data-testid="column-filter"
        onChange={ handleFilterChange }
        value={ column1 }
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
        FILTRAR
      </button>
      <div>
        {
          doneFilters.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <span>{filter}</span>
              <button type="button" onClick={ () => filterTrash(filter) }>X</button>
            </div>
          ))
        }
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ filterTrashAll }
        >
          Remover Filtragens
        </button>
      </div>
      <label htmlFor="ordenar">
        Ordenar
        <select
          data-testid="column-sort"
          name="column"
          onChange={ (event) => handleSortChange(event) }
          id="ordenar"
        >
          {sorted.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
      <label htmlFor="Ascendente">
        Ascendente
        <input
          id="Ascendente"
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          onChange={ (event) => handleSortChange(event) }
        />
      </label>
      <label htmlFor="Descendente">
        Descendente
        <input
          data-testid="column-sort-input-desc"
          id="Descendente"
          type="radio"
          name="sort"
          value="DESC"
          onChange={ (event) => handleSortChange(event) }
        />
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ handleSortClick }
        type="button"
      >
        ORDENAR

      </button>
    </div>
  );
}
export default NumericsFilter;
