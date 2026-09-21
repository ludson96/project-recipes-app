import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Testando componente Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'chef@recipesapp.com' }));
  });

  it('Testando se o componente Profile é renderizado e botão de logout funciona', async () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    expect(screen.getByTestId('page-title')).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    await userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });
});
