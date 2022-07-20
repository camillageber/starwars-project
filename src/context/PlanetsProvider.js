import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [cloneData, setCloneData] = useState([]);
  const [filterName, setFilterName] = useState('');

  function handleFilterPlanets({ target }) {
    const { value } = target;
    const planetFiltered = dataPlanets.filter((planet) => (
      planet.name.toLowerCase().includes(value.toLowerCase())));
    setCloneData(planetFiltered);
    setFilterName({ value });
  }

  // referência: ajuda para arrumar o requisito 2 do colega Carlos Daniel na sala de estudos

  const contextValue = {
    data: dataPlanets,
    setDataPlanets,
    setCloneData,
    setFilterName,
    filterByName: {
      name: filterName,
    },
    cloneData,
    handleFilterPlanets,
  };

  const fetchPlanetsData = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const dataApi = await response.json();
    const result = dataApi.results.map((key) => {
      delete key.residents;
      return key;
    });
    const cloneResult = dataApi.results;
    setDataPlanets(result);
    setCloneData(cloneResult);
    const SORT = -1;
    setCloneData(result.sort((a, b) => (a.name < b.name ? SORT : 1)));
  };

  useEffect(() => {
    fetchPlanetsData();
  }, []);

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: Proptypes.arrayOf(Proptypes.element).isRequired,
};

export default PlanetsProvider;
