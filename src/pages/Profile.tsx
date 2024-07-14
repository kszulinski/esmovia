// src/pages/Profile.tsx
import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Container>
      <h2>Your Favorites</h2>
      <ListGroup>
        {favorites.map((pokemon) => (
          <ListGroup.Item key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
            <Button
              variant="danger"
              size="sm"
              className="float-right"
              onClick={() => removeFavorite(pokemon.id)}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Profile;
