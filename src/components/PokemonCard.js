import React, { useState } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`pokemon-card ${showDetails ? 'details-open' : ''}`} onClick={toggleDetails}>
      <img
        src={imageUrl}
        alt={pokemon.name}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <p>{pokemon.name}</p>
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>

      {showDetails && (
        <div className="more-details">
          <p>Height: {pokemon.height / 10} m</p>
          <p>Weight: {pokemon.weight / 10} kg</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;



