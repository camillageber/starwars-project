import React from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

class PlanetsProvider extends React.Component {
  state = {
    data: [],
    cloneData: [],
    tableHeaders: [],
    filterByName: {
      name: '',
    },
    columns: [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ],
    range: ['maior que', 'menor que', 'igual a'],
    inputByNumber: [],
  };

  getPlanetsData = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((response) => {
        response.results.map((data) => delete data.residents);
        this.setState({
          data: response.results,
          tableHeaders: Object.keys(response.results[0]),
          cloneData: response.results,
        });
      });
  }

  handleFilterPlanets = ({ target }) => {
    const { cloneData } = this.state;
    const { value } = target;
    const planetFiltered = cloneData.filter((planet) => planet.name.includes(value));
    this.setState({
      data: planetFiltered,
      filterByName: { name: value },
    });
    // console.log(planetFiltered);
  }

  render() {
    const { children } = this.props;
    return (
      <PlanetsContext.Provider
        value={ { ...this.state,
          getPlanetsData: this.getPlanetsData,
          handleFilterPlanets: this.handleFilterPlanets } }
      >
        {children}
      </PlanetsContext.Provider>
    );
  }
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
