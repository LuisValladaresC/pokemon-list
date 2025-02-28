import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../services/pokemonService";
import { Pokemon } from "../../types/pokemon";
import { addPokemons } from "../../store/slices/pokemonsSlice";
import PokemonCard from "../PokemonCard";

interface PokemonListProps {
  page: number;
  search: string;
}

const PokemonList = ({ page, search }: PokemonListProps) => {
  const dispatch = useDispatch();
  const pokemons: Pokemon[] = useSelector((state: any) => state.pokemons);
  const [pokemonsToShow, setPokemonsToShow] = useState<Pokemon[]>([]);

  const pokemonsPerPage = 20;

  useEffect(() => {
    const loadData = async () => {
      const pokemons = await getPokemons(pokemonsPerPage, (page - 1) * pokemonsPerPage);
      dispatch(addPokemons(pokemons));
    }

    if (pokemons.length < pokemonsPerPage * page) {
      loadData();
    } else {
      setPokemonsToShow(getPokemonsToShow());
    }
  }, [page, pokemons]);

  useEffect(() => {
    setPokemonsToShow(getPokemonsToShow());
  }, [search]);

  const getPokemonsToShow = (): Pokemon[] => {
    if (!search) {
      const pokemonsByPage = pokemons.slice((page - 1) * pokemonsPerPage, page * pokemonsPerPage);
      return pokemonsByPage;
    } else {
      const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(search));
      return filteredPokemons;
    }
  }

  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {pokemonsToShow.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </ul>
  );
}

export default PokemonList;