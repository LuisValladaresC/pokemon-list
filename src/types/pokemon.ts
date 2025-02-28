export interface Pokemon {
  id: string;
  name: string;
  url: string;
  image: string;
  details?: PokemonDetails;
}

export interface PokemonDetails {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  abilities: string[];
}