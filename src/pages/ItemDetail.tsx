import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import { useFavorites } from '../contexts/FavoritesContext';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const { addFavorite } = useFavorites();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item', error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Button onClick={() => addFavorite(item)}>Add to Favorites</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemDetail;
