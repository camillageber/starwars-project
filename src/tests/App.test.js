import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('Testes da aplicação StarWars', () => {

  test('Verifica se há um input de pesquisa por nome na tela', () => {
    render(<App />);
    const inputName = screen.getByTestId(/name-filter/i);
    expect(inputName).toBeInTheDocument();
  });
  
  test('Verifica se há um dropdown pesquisando por "coluna" na tela', () => {
    render(<App />);
    const inputColumn = screen.getByTestId(/column-filter/i);
    expect(inputColumn).toBeInTheDocument();
  });

  test('Verifica se há um dropdown pesquisando por "comparação" na tela', () => {
    render(<App />);
    const inputComparison = screen.getByTestId(/comparison-filter/i);
    expect(inputComparison).toBeInTheDocument();
  });

  test('Verifica se há um dropdown pesquisando por valor didigitado na tela', () => {
    render(<App />);
    const inputValue = screen.getByTestId(/value-filter/i);
    expect(inputValue).toBeInTheDocument();
  });
  
  test('Verifica se há um botão "Filtar" na tela', () => {
    render(<App />);
    const buttonFilter = screen.getByTestId(/button-filter/i);
    expect(buttonFilter).toBeInTheDocument();
  });

  test('Verifica se o primeiro planeta da Tabela é "Tatooine"', async () => {
    render(<App />);
    const firstPlanet = await screen.findByText('Tatooine');
    expect(firstPlanet).toBeInTheDocument();
});

test('Verifica se a lista é filtrada ao digitar no input de pesquisa por nome', async () => {
  render(<App />);
  const inputName = screen.getByTestId(/name-filter/i);
  userEvent.type(inputName, 'oo');
  const teste1 = await screen.findByText(/tatooine/i);
  const teste2 = await screen.findByText(/naboo/i);
  expect(teste1).toBeInTheDocument();
  expect(teste2).toBeInTheDocument();
});

test('Verifica os valores iniciais dos filtros', () => {
  render(<App />);
  const population = screen.getByText('population');
  const greaterThan = screen.getByText('maior que');
  expect(population).toBeInTheDocument();
  expect(greaterThan).toBeInTheDocument();
});

 test('Verifica se o filtro "comparison" tem a opção "Maior que"', async () => {
  render(<App />);
  const inputColumn = screen.getByTestId(/column-filter/i)
  const option1 = screen.getByRole('option', { name: 'diameter' })
  userEvent.selectOptions(inputColumn, option1)

  const inputComparison1 = screen.getByTestId(/comparison-filter/i)
  const greaterThan = screen.getByRole('option', { name: 'maior que' })
  userEvent.selectOptions(inputComparison1, greaterThan)

  const inputValue = screen.getByTestId(/value-filter/i);
  const buttonFilter = screen.getByRole('button', {  name: /filtrar/i})
  expect(inputValue).toHaveAttribute("type", "number");
  userEvent.type(inputValue, "20000");
  userEvent.click(buttonFilter);
 
  const response = await screen.findAllByRole('cell');
  expect(response).toHaveLength(130);  
});

test('Verifica se o filtro "comparison" tem a opção "Menor que"', async () => {
  render(<App />);
  const inputColumn = screen.getByTestId(/column-filter/i)
  const option1 = screen.getByRole('option', { name: 'diameter' })
  userEvent.selectOptions(inputColumn, option1)

  const inputComparison1 = screen.getByTestId(/comparison-filter/i)
  const greaterThan = screen.getByRole('option', { name: 'menor que' })
  userEvent.selectOptions(inputComparison1, greaterThan)

  const inputValue = screen.getByTestId(/value-filter/i);
  const buttonFilter = screen.getByRole('button', {  name: /filtrar/i})
  expect(inputValue).toHaveAttribute("type", "number");
  userEvent.type(inputValue, "20000");
  userEvent.click(buttonFilter);
 
  const response = await screen.findAllByRole('cell');
  expect(response).toHaveLength(130);
});

test('Verifica se o filtro "comparison" tem a opção "Igual a"', async () => {
  render(<App />);
  const inputColumn = screen.getByTestId(/column-filter/i)
  const option1 = screen.getByRole('option', { name: 'diameter' })
  userEvent.selectOptions(inputColumn, option1)

  const inputComparison1 = screen.getByTestId(/comparison-filter/i)
  const greaterThan = screen.getByRole('option', { name: 'igual a' })
  userEvent.selectOptions(inputComparison1, greaterThan)

  const inputValue = screen.getByTestId(/value-filter/i);
  const buttonFilter = screen.getByRole('button', {  name: /filtrar/i})
  expect(inputValue).toHaveAttribute("type", "number");
  userEvent.type(inputValue, "20000");
  userEvent.click(buttonFilter);
 
  const response = await screen.findAllByRole('cell');
  expect(response).toHaveLength(130);
});

});

// fonte: https://github.com/testing-library/user-event/issues/358

