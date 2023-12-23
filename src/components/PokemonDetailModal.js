import React from 'react';

const PokemonDetailModal = ({ pokemon, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="pokemon-detail-modal" onClick={(e) => e.stopPropagation()}>
                <img
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    alt={pokemon.name}
                />
                <h2>{pokemon.name}</h2>
                <p>ID: {pokemon.id}</p>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default PokemonDetailModal;
