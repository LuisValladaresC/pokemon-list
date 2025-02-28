import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonDetails } from "../../services/pokemonService";
import { addPokemonDetails } from "../../store/slices/pokemonsSlice";
import { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = (id: string) => {
    if (pokemon.details) {
      setShowDetails(!showDetails);
    } else {
      getPokemonDetails(id).then((details) => {
        dispatch(addPokemonDetails({ id, details }));
        setShowDetails(!showDetails);
      });
    }
  }

  return (
    <li onClick={() => handleClick(pokemon.id)} className="w-80 border rounded-2xl border-gray-300 cursor-pointer overflow-hidden">
      <header className="border-b border-inherit p-2">
        <h2 className="font-semibold dark:text-white">{pokemon.name}</h2>
      </header>
      <div className="relative grid justify-center items-center p-2">
        <img src={pokemon.image} alt={pokemon.name} className="h-50 max-w-60" />
        {(showDetails && pokemon.details) &&
          <div className="absolute top-0 bottom-0 right-0 flex flex-col justify-center left-0 bg-white dark:bg-black/80 dark:text-white opacity-95 px-4">
            <p><span className="font-bold">HP:</span> {pokemon.details.hp}</p>
            <p><span className="font-bold">Attack:</span> {pokemon.details.attack}</p>
            <p><span className="font-bold">Defense:</span> {pokemon.details.defense}</p>
            <p><span className="font-bold">Special Attack:</span> {pokemon.details.specialAttack}</p>
            <p><span className="font-bold">Special Defense:</span> {pokemon.details.specialDefense}</p>
            <p><span className="font-bold">Speed:</span> {pokemon.details.speed}</p>
            <p><span className="font-bold">Abilities:</span> {pokemon.details.abilities.join(", ")}</p>
          </div>
        }
      </div>
    </li>
  )
}

export default PokemonCard;