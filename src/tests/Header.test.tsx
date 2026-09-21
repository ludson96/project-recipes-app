import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { describe, it, expect } from 'vitest';

describe('Testa componente Header', () => {
  it('testa o comportamento da barra de busca', async () => {
    renderWithRouter(<App />, ['/meals']);

    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);

    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    await userEvent.click(searchBtn);
    expect(searchBar).not.toBeInTheDocument();
  });
});
