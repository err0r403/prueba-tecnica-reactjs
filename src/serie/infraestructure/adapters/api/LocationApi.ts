import { LocationFilter } from '../../../domain/entities/Location';
import { LocationRepository } from '../../../domain/repositories/LocationRepository';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/location';

export class LocationApi implements LocationRepository {
  async getAll({ page, name }: LocationFilter) {
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
