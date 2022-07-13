import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data,
    getPlanetsData,
    tableHeaders,
    handleFilterPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanetsData();
  }, []);

  return (
    <div>
      <input
        data-testid="name-filter"
        placeholder="Search"
        onChange={ handleFilterPlanets }
      />
      <table>
        <thead>
          <tr>
            {
              tableHeaders.map((key, index) => (
                <th key={ index }>{ key }</th>
              ))
            }
          </tr>
          <tbody>
            {data.map((planet, index) => (
              <tr key={ index }>
                {tableHeaders.map((el, i) => (
                  <td key={ i }>{ planet[el] }</td>
                ))}
              </tr>
            ))}
          </tbody>
        </thead>
      </table>
    </div>
  );
}

export default Table;
