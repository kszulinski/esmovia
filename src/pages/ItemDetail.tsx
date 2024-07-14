// src/pages/ItemDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useFavorites } from '../contexts/FavoritesContext';

const ItemDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.id === parseInt(id!));

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <Container>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {isFavorite ? (
        <Button variant="danger" onClick={() => removeFavorite(pokemon.id)}>
          Remove from Favorites
        </Button>
      ) : (
        <Button variant="primary" onClick={() => addFavorite({ id: pokemon.id, name: pokemon.name })}>
          Add to Favorites
        </Button>
      )}
    </Container>
  );
};

export default ItemDetail;
