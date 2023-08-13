import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { renderWithProviders } from '../utils/test-utils';

test('full app rendering/navigating', async () => {
  const route = '/authentication/login';
  renderWithProviders(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
  const user = userEvent;
  // expect(screen.getByText(/no match/i)).toBeInTheDocument();
  expect(screen.getByText(/RentApp/i)).toBeInTheDocument();

  // verify page content for default route
  // expect(screen.getByText(/you are home/i)).toBeInTheDocument();

  // verify page content for expected route after navigating
  // await user.click(screen.getByText(/about/i));
  // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});
