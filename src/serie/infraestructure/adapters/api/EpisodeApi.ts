import { EpisodeFilter } from '../../../domain/entities/Episode';
import { EpisodeRepository } from '../../../domain/repositories/EpisodeRepository';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/episode';

export class EpisodeApi implements EpisodeRepository {
  async getAll({ page, name }: EpisodeFilter) {
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
