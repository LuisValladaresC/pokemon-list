import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pokemonsReducer from './slices/pokemonsSlice';

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;