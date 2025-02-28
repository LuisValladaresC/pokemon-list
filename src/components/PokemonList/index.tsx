import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../services/pokemonService";
import { Pokemon } from "../../types/pokemon";
import { addPokemons } from "../../store/slices/pokemonsSlice";
import PokemonCard from "../PokemonCard";

interface PokemonListProps {
  search: string;
}

const PokemonList = ({ search }: PokemonListProps) => {
  const dispatch = useDispatch();
  const pokemons: Pokemon[] = useSelector((state: any) => state.pokemons);
  const [pokemonsToShow, setPokemonsToShow] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1)
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
    window.scroll(window.scrollX, 0)
  }, [page]);

  useEffect(() => {
    setPokemonsToShow(getPokemonsToShow());
  }, [search]);

  const getPokemonsToShow = (): Pokemon[] => {
    if (!search) {
      const pokemonsByPage = pokemons.slice((page - 1) * pokemonsPerPage, page * pokemonsPerPage);
      return pokemonsByPage;
    } else {
      const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(search.toLowerCase()));
      return filteredPokemons;
    }
  }

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-4">
        {pokemonsToShow.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>

      {!search && 
        <div className="fixed bottom-0 flex justify-center my-6">
          {page > 1 &&
            <button
              onClick={() => setPage(page - 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l cursor-pointer">
              Previous
            </button>
          }
          <button
            onClick={() => setPage(page + 1)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ${page > 1 ? "rounded-r" : "rounded"} cursor-pointer`}>
            Next
          </button>
        </div>
      }
    </>
  );
}

export default PokemonList;