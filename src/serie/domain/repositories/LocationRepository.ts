import { Location, LocationFilter } from '../entities/Location';

export interface LocationsResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Location[];
}

export interface LocationRepository {
  getAll({
    page = 1,
    name,
    type,
    dimension
  }: LocationFilter): Promise<LocationsResponse>;
  getById(id: number): Promise<Location>;
}
