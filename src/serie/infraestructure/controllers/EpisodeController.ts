import { EpisodeFilter } from '../../domain/entities/Episode';
import { EpisodeRepository } from '../../domain/repositories/EpisodeRepository';

export default class EpisodeController {
  constructor(private episodeRepository: EpisodeRepository) {}

  async getAll(episodeFilter: EpisodeFilter) {
    return await this.episodeRepository.getAll(episodeFilter);
  }

  async getById(id: number) {
    return await this.episodeRepository.getById(id);
  }
}
