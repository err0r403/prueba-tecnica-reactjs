import { CharacterFilter } from '../../../domain/entities/Character';
import { CharacterRepository } from '../../../domain/repositories/CharacterRepository';
import axios from 'axios';
import queryString from 'query-string';

const API_URL = 'https://rickandmortyapi.com/api/character';

export class CharacterApi implements CharacterRepository {
  async getAll({ page, name, status, species, gender }: CharacterFilter) {
    const params = queryString.stringify(
      {
        page,
        name,
        status,
        species,
        gender
      },
      {
        skipNull: true
      }
    );
    const response = await axios.get(`${API_URL}?${params}`);
    return response.data;
  }

  async getById(id: number): Promise<any> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
}
