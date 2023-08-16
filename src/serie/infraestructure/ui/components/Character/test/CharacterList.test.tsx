import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../../../utils/test-utils';
import { character_mock_data } from './mock-data';
import CharacterList from '../CharacterList';

test('CharacterList', async () => {
  const route = '/character/1';
  renderWithProviders(
    <MemoryRouter initialEntries={[route]}>
      <CharacterList />
    </MemoryRouter>,
    {
      preloadedState: {
        auth: {
          token: 'QpwL5tke4Pnpja7X4',
          isLoading: false,
          _persist: { version: 1, rehydrated: true },
          error: undefined
        },
        character: {
          ...character_mock_data,
          _persist: { version: 1, rehydrated: true }
        }
      }
    }
  );

  expect(
    screen.getByText('Gar Gloonch', {
      selector: 'span'
    })
  ).toBeInTheDocument();
});
