export class Location {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public dimension: string,
    public residents: string[],
    public url: string,
    public created: string
  ) {}
}

export interface LocationFilter {
  page: number;
  name?: string;
  type?: string;
  dimension?: string;
}
