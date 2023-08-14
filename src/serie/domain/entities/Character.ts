export enum CharacterStatus {
  alive = 'alive',
  dead = 'dead',
  unknown = 'unknown'
}
export const characterStatus = Object.values(CharacterStatus);

export enum CharacterGender {
  female = 'female',
  male = 'male',
  genderless = 'genderless',
  unknown = 'unknown'
}

export const characterGender = Object.values(CharacterGender);

export class Character {
  constructor(
    public id: number,
    public name: string,
    public status: CharacterStatus,
    public species: string,
    public type: string,
    public gender: CharacterGender,
    public origin: any,
    public location: any,
    public image: string,
    public episode: string[],
    public url: string,
    public created: string
  ) {}
}

export interface CharacterFilter {
  page: number;
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
}
