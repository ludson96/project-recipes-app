import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { describe, test, expect, beforeEach } from 'vitest';

describe('Testando as buscas da pagina "/Meals"', () => {
  beforeEach(() => {
    renderWithRouter(<App />, ['/meals']);
  });

  test('Elementos principais estão presentes na tela', () => {
    const testIds = [
      'page-title',
      'footer',
      'profile-top-btn',
      'search-top-btn',
      'drinks-bottom-btn',
      'meals-bottom-btn',
    ];

    testIds.forEach((testId) => {
      const el = screen.getByTestId(testId);
      expect(el).toBeInTheDocument();
    });
  });

  test('Ao clicar no botão de "Profile", redireciona para pagina "/profile"', async () => {
    const btnProfile = screen.getByTestId('profile-top-btn');
    await userEvent.click(btnProfile);

    const { history } = renderWithRouter(<App />, ['/profile']);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Ao clicar no botão de "Drinks", redireciona para pagina "/drinks"', async () => {
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(btnDrinks);

    const { history } = renderWithRouter(<App />, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');
  });

  test('Ao clicar no icone da "Lupa", a searchBar deve ser renderizada', async () => {
    const btnSearchBar = screen.getByTestId('search-top-btn');
    await userEvent.click(btnSearchBar);

    const searchBar = screen.getByTestId('search-bar-content');
    expect(searchBar).toBeInTheDocument();
  });
});
