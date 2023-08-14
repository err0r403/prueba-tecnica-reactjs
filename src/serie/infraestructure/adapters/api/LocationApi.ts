import { LocationFilter } from '../../../domain/entities/Location';
import { LocationRepository } from '../../../domain/repositories/LocationRepository';
import axios from 'axios';
import queryString from 'query-string';

const API_URL = 'https://rickandmortyapi.com/api/location';

export class LocationApi implements LocationRepository {
  async getAll({ page, name }: LocationFilter) {
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
