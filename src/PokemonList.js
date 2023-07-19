import React, { useState, useEffect } from 'react';
import './PokemonList.css'; // Importar archivo CSS para los estilos

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1015')
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
      })
      .catch(error => {
        console.error('Error al obtener la lista de pokémones:', error);
      });
  }, []);

  const handlePokemonSelect = async (pokemonUrl) => {
    try {
      const response = await fetch(pokemonUrl);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error al obtener la información del pokémon:', error);
    }
  };

  return (
    <div className="pokemon-content-container">
      <h2>Listado de Pokémones</h2>
      <select className="pokemon-select" onChange={(e) => handlePokemonSelect(e.target.value)}>
        <option value="">Seleccione un Pokémon</option>
        {pokemonList.map(pokemon => {
          const pokemonNumber = pokemon.url.split('/').slice(-2, -1);
          const pokemonLabel = `#${pokemonNumber} - ${pokemon.name}`;
          return (
            <option key={pokemon.name} value={pokemon.url}>
              {pokemonLabel}
            </option>
          );
        })}
      </select>
      <div className="pokemon-card-container">
        <div className={`pokemon-card ${selectedPokemon ? 'pokemon-card-rotate' : ''}`}>
          <div className="pokemon-card-front"></div>
          <div className="pokemon-card-back">
            {selectedPokemon && (
              <div>
                <h3>Información del Pokémon:</h3>
                <p>Nombre: {selectedPokemon.name}</p>
                <p>Peso: {selectedPokemon.weight}</p>
                <p>Altura: {selectedPokemon.height}</p>
                <p>Tipo: {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;