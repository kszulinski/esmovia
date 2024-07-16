
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useFavorites } from '../contexts/FavoritesContext';

const AdminPage = () => {
  const { elementsPerPage, setElementsPerPage } = useFavorites();
  const [count, setCount] = useState(elementsPerPage.toString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setElementsPerPage(parseInt(count, 10));
  };

  return (
    <Container>
      <h2>Admin Page</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="elementsPerPage">
          <Form.Label>Number of Elements per Page</Form.Label>
          <Form.Control
            type="number"
            value={count}
            onChange={handleChange}
            min="1"
            step="1"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default AdminPage;
