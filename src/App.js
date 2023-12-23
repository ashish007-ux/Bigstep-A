import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import PokemonDetailModal from './components/PokemonDetailModal';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPokemons();
    fetchPokemonTypes();
  }, [offset, selectedType, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    setOffset(0);
    setPokemons([]);
  };

  const handleFilterChange = (type) => {
    setSelectedType(type);
    setOffset(0);
    setPokemons([]);
  };

  const fetchPokemons = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      let url = `${apiUrl}?offset=${offset}&limit=20`;

      if (searchTerm) {
        url += `&${isNaN(searchTerm) ? 'name' : 'id'}=${searchTerm}`;
      } else if (selectedType) {
        url = `https://pokeapi.co/api/v2/type/${selectedType}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      const newPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return details;
        })
      );

      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
      setOffset(offset + 20);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPokemonDetails = async (pokemonName) => {
    const response = await fetch(`${apiUrl}${pokemonName}`);
    const data = await response.json();
    return data;
  };

  const fetchPokemonTypes = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results);
    } catch (error) {
      console.error('Error fetching Pokemon types:', error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Pokedex</h1>
      </div>
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="type-filter">
        <TypeFilter types={types} selectedType={selectedType} onChange={handleFilterChange} />
      </div>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="footer">
        <p>© 2023 Pokedex App</p>
      </div>
    </div>
  );
}

export default App;
