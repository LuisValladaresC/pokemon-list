import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../../types/pokemon";

const initialState: Pokemon[] = [];

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addPokemons: (state, action) => {
      const pokemonsToAdd = action.payload.map((pokemon: Pokemon) => {
        const pokemonId = pokemon.url.split("/")[6];
        const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

        return {
          ...pokemon,
          id: pokemonId,
          image: pokemonImageUrl,
        }
      });
      return [...state, ...pokemonsToAdd];
    },
    addPokemonDetails: (state, action) => {
      const { id, details } = action.payload;
      const pokemonIndex = state.findIndex(pokemon => pokemon.id === id);
      state[pokemonIndex].details = details;
    }
  },
});

export const { addPokemons, addPokemonDetails } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;