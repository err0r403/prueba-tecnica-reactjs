import { Episode, EpisodeFilter } from '../entities/Episode';

export interface EpisodesResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Episode[];
}

export interface EpisodeRepository {
  getAll({ page = 1, name, episode }: EpisodeFilter): Promise<EpisodesResponse>;
  getById(id: number): Promise<Episode>;
}
