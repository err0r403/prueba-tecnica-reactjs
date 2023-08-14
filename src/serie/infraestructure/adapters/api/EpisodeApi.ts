import { EpisodeFilter } from '../../../domain/entities/Episode';
import { EpisodeRepository } from '../../../domain/repositories/EpisodeRepository';
import axios from 'axios';
import queryString from 'query-string';

const API_URL = 'https://rickandmortyapi.com/api/episode';

export class EpisodeApi implements EpisodeRepository {
  async getAll({ page, name }: EpisodeFilter) {
    const params = queryString.stringify(
      {
        page,
        name
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
