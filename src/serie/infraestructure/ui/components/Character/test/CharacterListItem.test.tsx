import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../../../utils/test-utils';
import { character_mock_data } from './mock-data';
import { CharacterListItem } from '../CharacterListItem';

test('CharacterListItem', async () => {
  const route = '/character';
  const { character } = character_mock_data;
  renderWithProviders(
    <MemoryRouter initialEntries={[route]}>
      <CharacterListItem
        id={character!.id}
        name={character!.name}
        status={character!.status}
        gender={character!.gender}
        image={character!.image}
        species={character!.species}
        type={character!.type}
        origin={character!.origin}
        location={character!.species}
        episode={character!.episode}
        url={character!.url}
        created={character!.created}
      />
    </MemoryRouter>,
    {
      preloadedState: {
        auth: {
          token: 'QpwL5tke4Pnpja7X4',
          isLoading: false,
          _persist: { version: 1, rehydrated: true },
          error: undefined
        }
      }
    }
  );

  expect(
    screen.getByText('Rick Sanchez', {
      selector: 'span'
    })
  ).toBeInTheDocument();
});
