import { PokemonDetails } from "../types/pokemon";

export const getPokemons = async (limit: number, offset: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  console.log(url);

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch pokemon data');
  const data = await response.json();
  return data.results;
}

export const getPokemonDetails = async (id: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  console.log(url);

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch pokemon data');
  const data = await response.json();

  const pokemonDetails = data.stats.reduce((accum: PokemonDetails, stat: any) => {
    switch (stat.stat.name) {
      case "hp":
        accum.hp = stat.base_stat;
        break;
      case "attack":
        accum.attack = stat.base_stat;
        break;
      case "defense":
        accum.defense = stat.base_stat;
        break;
      case "special-attack":
        accum.specialAttack = stat.base_stat;
        break;
      case "special-defense":
        accum.specialDefense = stat.base_stat;
        break;
      case "speed":
        accum.speed = stat.base_stat;
        break;
    }
    return accum;
  });

  pokemonDetails.abilities = data.abilities.map((ability: any) => ability.ability.name);

  return pokemonDetails;
}

