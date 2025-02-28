import { lazy, Suspense, useState } from "react"

const PokemonList = lazy(() => import('./components/PokemonList'));

function App() {
  const [page, setPage] = useState(1)
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

      <Suspense fallback={<div className="dark:text-white">Loading Pokemons...</div>}>
        <PokemonList page={page} search={search} />
      </Suspense>

      {!search && 
        <div className="flex justify-center my-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l cursor-pointer">
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r cursor-pointer">
            Next
          </button>
        </div>
      }
    </main>
  )
}

export default App
