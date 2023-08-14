import {
  CharacterRepository,
  CharactersResponse
} from '../../domain/repositories/CharacterRepository';

import { CharacterFilter } from '../../domain/entities/Character';

export class CharacterUseCase {
  constructor(private characterRepository: CharacterRepository) {}

  async getAll(characterFilter: CharacterFilter): Promise<CharactersResponse> {
    return await this.characterRepository.getAll(characterFilter);
  }
}
