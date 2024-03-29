import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockAPI from '../mocks/mockAPI';
import userEvent from '@testing-library/user-event';


describe('Testes da aplicação StarWars', () => {
  test('Verifica se há um input de pesquisa por nome na tela', () => {
    render(<App />);
    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();
  });

  test('Verifica se há um dropdown pesquisando por "coluna" na tela', () => {
    render(<App />);
    const inputColumn = screen.getByTestId('column-filter');
    expect(inputColumn).toBeInTheDocument();
  });

  test('Verifica se há um dropdown pesquisando por "comparação" na tela', () => {
    render(<App />);
    const inputComparison = screen.getByTestId('comparison-filter');
    expect(inputComparison).toBeInTheDocument();
  });

  test('Verifica se há um dropdown pesquisando por valor didigitado na tela', () => {
    render(<App />);
    const inputValue = screen.getByTestId('value-filter');
    expect(inputValue).toBeInTheDocument();
  });

  test('Verifica se há um botão "Filtrar" na tela', () => {
    render(<App />);
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
  });

  test('Verifica se o primeiro planeta da Tabela é "Tatooine"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: mockAPI }),
    });

    render(<App />);
    const firstPlanet = await screen.findByText('Tatooine');
    expect(firstPlanet).toBeInTheDocument();
});

test('Verifica a filtragem das options de coluna, comparação e valor digitado', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ results: mockAPI }),
  });

  render(<App />);

  const inputName = screen.getByTestId('name-filter');
  const inputColumn = screen.getByTestId('column-filter');
  const inputComparison = screen.getByTestId('comparison-filter');
  const inputValue = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  // encontra na tela os planetas da tabela sem filtragem
  const planet1 = await screen.findByText('Tatooine');
  const planet2 = await screen.findByText('Naboo');
  const planet3 = await screen.findByText('Dagobah');

  // testa a filtragem por nome
  userEvent.type(inputName, 'oo')

  expect(planet1).toBeInTheDocument();
  expect(planet2).toBeInTheDocument();
  expect(planet3).not.toBeInTheDocument();

  expect(screen.getAllByRole('row').length).toBe(3);

  userEvent.clear(inputName);

  // testa a filtragem por opções de coluna, comparação de valores e valor digitado
  userEvent.selectOptions(inputColumn, ['orbital_period']);
  userEvent.selectOptions(inputComparison, ['menor que']);
  userEvent.clear(inputValue);
  userEvent.type(inputValue, '400');
  userEvent.click(buttonFilter);

  const planet4 = await screen.findByText('Dagobah')
  expect(planet4).toBeInTheDocument();

  expect(screen.getAllByRole('row').length).toBe(6);
});

test('Verifica a filtragem das options de coluna por ordenação Ascendente ou Descendente', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ results: mockAPI }),
  });

  render(<App />)

  const inputColumn = screen.getByTestId('column-sort');
  const radioASC = screen.getByTestId('column-sort-input-asc');
  const radioDESC = screen.getByTestId('column-sort-input-desc');
  const buttonSort = screen.getByTestId('column-sort-button');

  // testa as opções de filtragem Ascendente
  userEvent.selectOptions(inputColumn, ['orbital_period']);
  userEvent.click(radioASC);
  userEvent.click(buttonSort);

  const planetAsc = await screen.findByText('Tatooine')
  expect(planetAsc).toBeInTheDocument();

// testa as opções de filtragem Descendente
  userEvent.selectOptions(inputColumn, ['population']);
  userEvent.click(radioDESC);
  userEvent.click(buttonSort);

  const planetDesc = await screen.findByText('Coruscant')
  expect(planetDesc).toBeInTheDocument();
})

test('Verifica a filtragem dos primeiros filtros em conjunto com o de ordenação Ascendente', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ results: mockAPI }),
  });

  render(<App />)

  const inputColumn1 = screen.getByTestId('column-filter');
  const inputComparison = screen.getByTestId('comparison-filter');
  const inputValue = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  userEvent.selectOptions(inputColumn1, ['population']);
  userEvent.selectOptions(inputComparison, ['maior que']);
  userEvent.clear(inputValue);
  userEvent.type(inputValue, '200000');
  userEvent.click(buttonFilter);

  const planet4 = await screen.findByText('Bespin')
  expect(planet4).toBeInTheDocument();

  expect(screen.getAllByRole('row').length).toBe(11);

  const inputColumn = screen.getByTestId('column-sort');
  const radioASC = screen.getByTestId('column-sort-input-asc');
  const buttonSort = screen.getByTestId('column-sort-button');

  // testa as opções de filtragem Ascendente
  userEvent.selectOptions(inputColumn, ['population']);
  userEvent.click(radioASC);
  userEvent.click(buttonSort);

  const planetAsc = await screen.findByText('Coruscant')
  expect(planetAsc).toBeInTheDocument();

  expect(screen.getAllByRole('row').length).toBe(11);

})

test('Verifica a filtragem dos primeiros filtros em conjunto com o de ordenação Descendente', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ results: mockAPI }),
  });

  render(<App />)

  const inputColumn1 = screen.getByTestId('column-filter');
  const inputComparison = screen.getByTestId('comparison-filter');
  const inputValue = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  userEvent.selectOptions(inputColumn1, ['orbital_period']);
  userEvent.selectOptions(inputComparison, ['menor que']);
  userEvent.clear(inputValue);
  userEvent.type(inputValue, '400');
  userEvent.click(buttonFilter);

  const planet4 = await screen.findByText('Alderaan')
  expect(planet4).toBeInTheDocument();

  expect(screen.getAllByRole('row').length).toBe(11);

  const inputColumn = screen.getByTestId('column-sort');
  const radioDESC = screen.getByTestId('column-sort-input-desc');
  const buttonSort = screen.getByTestId('column-sort-button');


// testa as opções de filtragem Descendente
  userEvent.selectOptions(inputColumn, ['orbital_period']);
  userEvent.click(radioDESC);
  userEvent.click(buttonSort);

  const planetDesc = await screen.findByText('Coruscant')
  expect(planetDesc).toBeInTheDocument();
  expect(screen.getAllByRole('row').length).toBe(11);
})
  // fonte: https://github.com/testing-library/user-event/issues/358

  test('Verifica se há um botão "Remover Filtragens" na tela', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: mockAPI }),
    });
  
    render(<App />)
    const btnRemoveAll = screen.getByTestId('button-remove-filters');
    expect(btnRemoveAll).toBeInTheDocument();

  })

  test('Verifica botões de remover filtros individuais', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: mockAPI }),
    });
  
    render(<App />)
  const inputColumn = await screen.findByTestId('column-filter');
  const inputComparison = screen.getByTestId('comparison-filter');
  const inputValue = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  userEvent.selectOptions(inputColumn, ['population']);
  userEvent.selectOptions(inputComparison, ['maior que']);
  userEvent.type(inputValue, '2000000');
  userEvent.click(buttonFilter);
  expect(screen.getAllByRole('row').length).toBe(7)

  const btnRemove = screen.getByRole('button', {  name: /x/i})
  userEvent.click(btnRemove);
  const allPlanets = await screen.findAllByRole('cell'); // all planets
  expect(allPlanets).toHaveLength(130);
})

test('Verifica botão de apagar todos filtros', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ results: mockAPI }),
  });
  render(<App />);
  
const inputColumn = screen.getByTestId('column-filter');
const inputComparison = screen.getByTestId('comparison-filter');
const inputValue = screen.getByTestId('value-filter');
const buttonFilter = screen.getByTestId('button-filter');

userEvent.selectOptions(inputColumn, ['diameter']);
userEvent.selectOptions(inputComparison, ['igual a']);
userEvent.clear(inputValue);
userEvent.type(inputValue, '12500');

userEvent.click(buttonFilter);

expect(screen.getAllByRole('row').length).toBe(1)
const btnRemoveAll = screen.getByTestId('button-remove-filters');

userEvent.click(btnRemoveAll);
})
})
