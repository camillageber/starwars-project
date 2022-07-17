import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [cloneData, setCloneData] = useState([]);
  const [filterName, setFilterName] = useState('');

  function handleFilterPlanets({ target }) {
    const { value } = target;
    const planetFiltered = cloneData.filter((planet) => planet.name.includes(value));
    setDataPlanets(planetFiltered);
    setFilterName({ value });
  }

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

// ==============================================
// import React from 'react';
// import PropTypes from 'prop-types';
// import PlanetsContext from './PlanetsContext';

// class PlanetsProvider extends React.Component {
//   state = {
//     data: [],
//     cloneData: [],
//     tableHeaders: [],
//     filterByName: {
//       name: '',
//     },
//   };

//   getPlanetsData = () => {
//     fetch('https://swapi-trybe.herokuapp.com/api/planets/')
//       .then((response) => response.json())
//       .then((response) => {
//         response.results.map((data) => delete data.residents);
//         this.setState({
//           data: response.results,
//           tableHeaders: Object.keys(response.results[0]),
//           cloneData: response.results,
//         });
//       });
//   }

//   handleFilterPlanets = ({ target }) => {
//     const { cloneData } = this.state;
//     const { value } = target;
//     const planetFiltered = cloneData.filter((planet) => planet.name.includes(value));
//     this.setState({
//       data: planetFiltered,
//       filterByName: { name: value },
//     });
//     // console.log(planetFiltered);
//   }

//   render() {
//     const { children } = this.props;
//     return (
//       <PlanetsContext.Provider
//         value={ { ...this.state,
//           getPlanetsData: this.getPlanetsData,
//           handleFilterPlanets: this.handleFilterPlanets } }
//       >
//         {children}
//       </PlanetsContext.Provider>
//     );
//   }
// }

// PlanetsProvider.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// export default PlanetsProvider;
