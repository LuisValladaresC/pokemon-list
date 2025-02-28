import { lazy, Suspense, useState } from "react"

const PokemonList = lazy(() => import('./components/PokemonList'));

function App() {
  const [search, setSearch] = useState("")

  return (
    <main className="container flex flex-col items-center mx-auto py-6">
      <h1 className="text-4xl text-center font-bold mb-6 dark:text-white">Pokemon List</h1>

      <input
          type="text"
          placeholder='Search a pokemon'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='rounded-lg border border-gray-300 w-80 p-4 mb-6 dark:text-white dark:placeholder:text-white/70' />

      <Suspense fallback={<div className="dark:text-white animate-pulse">Loading Pokemons...</div>}>
        <PokemonList search={search} />
      </Suspense>
    </main>
  )
}

export default App
