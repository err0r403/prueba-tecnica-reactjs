import { LocationFilter } from '../../domain/entities/Location';
import { LocationRepository } from '../../domain/repositories/LocationRepository';

export default class LocationController {
  constructor(private locationRepository: LocationRepository) {}

  async getAll(locationFilter: LocationFilter) {
    return await this.locationRepository.getAll(locationFilter);
  }

  async getById(id: number) {
    return await this.locationRepository.getById(id);
  }
}
