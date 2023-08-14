import { Character, CharacterFilter } from '../entities/Character';

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}
export interface CharacterRepository {
  getAll({
    page = 1,
    name,
    status,
    species,
    gender
  }: CharacterFilter): Promise<CharactersResponse>;
  getById(id: number): Promise<Character>;
}
