import { CharacterFilter } from '../../domain/entities/Character';
import { CharacterRepository } from '../../domain/repositories/CharacterRepository';

export default class CharacterController {
  constructor(private characterRepository: CharacterRepository) {}

  async getAll(characterFilter: CharacterFilter) {
    return await this.characterRepository.getAll(characterFilter);
  }

  async getById(id: number) {
    return await this.characterRepository.getById(id);
  }
}
