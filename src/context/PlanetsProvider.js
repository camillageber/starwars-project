import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './PlanetsContext';

const INITIAL_STATE = { nome: 'Xablau', idade: 100 };

function PlanetsProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
