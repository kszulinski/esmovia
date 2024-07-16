
import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../contexts/FavoritesContext';
import { capitalize } from '../utils/capitalize';

const Home = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const { elementsPerPage, favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchPokemonList = async () => {
      let allPokemon: any[] = [];
      let currentUrl = `https://pokeapi.co/api/v2/pokemon?limit=${elementsPerPage}`;

      const response = await fetch(currentUrl);
      const data = await response.json();
      allPokemon = data.results;

      setPokemonList(allPokemon);
    };

    fetchPokemonList();
  }, [elementsPerPage]);

  const isFavorite = (pokemonId: number) => {
    return favorites.some((fav) => fav.id === pokemonId);
  };

  const toggleFavorite = (pokemonId: number) => {
    if (isFavorite(pokemonId)) {
      removeFavorite(pokemonId);
    } else {
      const pokemon = pokemonList.find((poke) => poke.url.includes(`/${pokemonId}/`));
      if (pokemon) {
        addFavorite({ id: pokemonId, name: pokemon.name });
      }
    }
  };

  return (
    <Container>
      <h2>Pokémon List</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {pokemonList.map((pokemon, index) => (
          <Col key={index}>
            <Card>
              <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
              <Card.Body>
                <Card.Title>{capitalize(pokemon.name)}</Card.Title>
                <Link to={`/pokemon/${index + 1}`}>
                  <Button variant="primary">Details</Button>
                </Link>
                <Button
                  variant="link"
                  onClick={() => toggleFavorite(index + 1)}
                  style={{ color: isFavorite(index + 1) ? 'red' : 'gray' }}
                >
                  <FontAwesomeIcon icon={isFavorite(index + 1) ? faHeartSolid : faHeartRegular} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
