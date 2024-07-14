import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = () => {
  const { favorites } = useFavorites();

  return (
    <Container>
      <h2>Profile</h2>
      <h3>Favorites</h3>
      <Row>
        {favorites.map((item) => (
          <Col key={item.id} md="4">
            <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profile;
