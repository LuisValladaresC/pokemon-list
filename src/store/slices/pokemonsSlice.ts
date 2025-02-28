import { createSlice } from "@reduxjs/toolkit";
import { Pokemon, PokemonDetails } from "../../types/pokemon";

const initialState: Pokemon[] = [];

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addPokemons: (state, action) => {
      const pokemonsToAdd = action.payload.map((pokemon: Pokemon) => {
        pokemon.id = pokemon.url.split("/")[6];
        pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
        return pokemon;
      });
      return [...state, ...pokemonsToAdd];
    },
    addPokemonDetails: (state, action) => {
      const { id, details } = action.payload;
      const pokemonDetails: PokemonDetails = details.stats.reduce((accum: PokemonDetails, {stat, base_stat}: any) => {
        switch (stat.name) {
          case "hp":
            accum.hp = base_stat;
            break;
          case "attack":
            accum.attack = base_stat;
            break;
          case "defense":
            accum.defense = base_stat;
            break;
          case "special-attack":
            accum.specialAttack = base_stat;
            break;
          case "special-defense":
            accum.specialDefense = base_stat;
            break;
          case "speed":
            accum.speed = base_stat;
            break;
        }
        return accum;
      }, {});
      pokemonDetails.abilities = details.abilities.map((ability: any) => ability.ability.name);

      const pokemonIndex = state.findIndex(pokemon => pokemon.id === id);
      state[pokemonIndex].details = pokemonDetails;
    }
  },
});

export const { addPokemons, addPokemonDetails } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;