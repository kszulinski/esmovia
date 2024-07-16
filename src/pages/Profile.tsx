
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { capitalize } from '../utils/capitalize';

const Profile = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (pokemonId: number) => {
    if (window.confirm('Are you sure you want to remove this Pokémon from your favorites?')) {
      removeFavorite(pokemonId);
    }
  };

  return (
    <Container>
      <h2>My Favorites</h2>
      <div className="favorites-list">
        {favorites.map((pokemon) => (
          <Card key={pokemon.id} className="favorite-card">
            <Card.Body>
              <Card.Title>{capitalize(pokemon.name)}</Card.Title>
              <Link to={`/pokemon/${pokemon.id}`}>
                <Button variant="primary">Details</Button>
              </Link>
              <Button variant="danger" onClick={() => handleRemoveFavorite(pokemon.id)}>
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Profile;
