import App from './App';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { renderWithProviders } from '../utils/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('App rendering /authentication/login', async () => {
  const route = '/authentication/login';
  renderWithProviders(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByText('Login', {
      selector: 'h3'
    })
  ).toBeInTheDocument();

  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
});

test('App login /authentication/login', async () => {
  const route = '/authentication/login';
  renderWithProviders(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
  const user = userEvent;

  expect(
    screen.getByText('Login', {
      selector: 'h3'
    })
  ).toBeInTheDocument();

  const inputEmail = screen.getByLabelText('Email');
  const inputPassword = screen.getByLabelText('Password');

  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();

  user.type(inputEmail, 'eve.holt@reqres.in');
  user.type(inputPassword, 'pistol');

  await user.click(screen.getByText(/Login/i, { selector: 'button' }));

  // Wait for the navigation to complete and the next page to load
  await waitFor(() => {
    expect(
      screen.getByText(/Characters List/i, { selector: 'h4' })
    ).toBeInTheDocument();
  });
});
