export const getPokemons = async (limit: number, offset: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch pokemon data');
  const data = await response.json();
  return data.results;
}

export const getPokemonDetails = async (id: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch pokemon data');
  const data = await response.json();
  return data;
}

