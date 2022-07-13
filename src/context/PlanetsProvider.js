import React from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

class PlanetsProvider extends React.Component {
  state = {
    data: [],
    tableItems: [],
  };

  getPlanetsData = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((response) => {
        response.results.map((data) => delete data.residents);
        this.setState({ data: response.results });
        this.setState({ tableItems: Object.keys(response.results[0]) });
      });
  }

  render() {
    const { children } = this.props;
    return (
      <PlanetsContext.Provider
        value={ { ...this.state, getPlanetsData: this.getPlanetsData } }
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
