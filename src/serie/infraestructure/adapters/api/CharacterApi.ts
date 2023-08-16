import { CharacterFilter } from '../../../domain/entities/Character';
import { CharacterRepository } from '../../../domain/repositories/CharacterRepository';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export class CharacterApi implements CharacterRepository {
  async getAll({ page, name }: CharacterFilter) {
    let params = `page=${page}`;
    if (name?.length) {
      params = params.concat(`&name=${name}`);
    }
    const response = await axios.get(`${API_URL}?${params}`);
    return response.data;
  }

  async getById(id: number): Promise<any> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
}
