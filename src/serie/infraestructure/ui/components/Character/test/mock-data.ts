import {
  CharacterGender,
  CharacterStatus
} from '../../../../../domain/entities/Character';
import { CharacterState } from '../../../../slices/CharacterSlice';
export const character_mock_data: CharacterState = {
  error: undefined,
  results: [
    {
      id: 131,
      name: 'Gar Gloonch',
      status: CharacterStatus.dead,
      species: 'Alien',
      type: 'Zombodian',
      gender: CharacterGender.male,
      origin: { name: 'unknown', url: '' },
      location: {
        name: 'Nuptia 4',
        url: 'https://rickandmortyapi.com/api/location/13'
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/131.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/13',
        'https://rickandmortyapi.com/api/episode/18',
        'https://rickandmortyapi.com/api/episode/21'
      ],
      url: 'https://rickandmortyapi.com/api/character/131',
      created: '2017-12-26T19:54:43.476Z'
    },
    {
      id: 135,
      name: 'Garment District Rick',
      status: CharacterStatus.dead,
      species: 'Human',
      type: '',
      gender: CharacterGender.male,
      origin: { name: 'unknown', url: '' },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3'
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/135.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/28'],
      url: 'https://rickandmortyapi.com/api/character/135',
      created: '2017-12-26T20:51:43.614Z'
    },
    {
      id: 210,
      name: 'Lucy',
      status: CharacterStatus.dead,
      species: 'Human',
      type: '',
      gender: CharacterGender.female,
      origin: {
        name: 'Earth (Replacement Dimension)',
        url: 'https://rickandmortyapi.com/api/location/20'
      },
      location: {
        name: 'Earth (Replacement Dimension)',
        url: 'https://rickandmortyapi.com/api/location/20'
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/210.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/11'],
      url: 'https://rickandmortyapi.com/api/character/210',
      created: '2017-12-30T14:01:23.319Z'
    }
  ],
  isLoading: false,
  pagination: { count: 387, page: 4, pages: 20 },
  filter: { page: 1, name: 'c' },
  character: {
    id: 1,
    name: 'Rick Sanchez',
    status: CharacterStatus.alive,
    species: 'Human',
    type: '',
    gender: CharacterGender.male,
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1'
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3'
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  }
};
