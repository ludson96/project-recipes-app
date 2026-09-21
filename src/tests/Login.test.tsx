import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { describe, it, expect, beforeEach } from 'vitest';

const emailValid = 'chef@recipesapp.com';
const passwordValid = '123456789';

describe('Testando o componente <Login />', () => {
  it('Testando se os campos de email e senha existem', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
    expect(emailInput).toHaveProperty('type', 'email');
    expect(senhaInput).toHaveProperty('type', 'password');
  });

  it('Testando se o usuário pode digitar nos campos', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    await userEvent.type(emailInput, emailValid);
    await userEvent.type(senhaInput, passwordValid);

    expect(emailInput).toHaveValue(emailValid);
    expect(senhaInput).toHaveValue(passwordValid);
  });

  it('Testando se o botão de login está desabilitado com campos vazios', () => {
    renderWithRouter(<App />);
    const loginButton = screen.getByTestId('login-submit-btn');
    expect(loginButton).toBeDisabled();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('Testando se as chaves estão salvas no localStorage corretamente após submit', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);
    const btnSubmit = screen.getByTestId('login-submit-btn');

    await userEvent.type(emailInput, emailValid);
    await userEvent.type(senhaInput, passwordValid);
    await userEvent.click(btnSubmit);

    const userLocalStorage = localStorage.getItem('user');
    const mealsTokenLocalStorage = localStorage.getItem('mealsToken');
    const drinksTokenLocalStorage = localStorage.getItem('drinksToken');

    expect(JSON.parse(userLocalStorage || '{}')).toStrictEqual({ email: emailValid });
    expect(mealsTokenLocalStorage).toBe('1');
    expect(drinksTokenLocalStorage).toBe('1');
  });
});
