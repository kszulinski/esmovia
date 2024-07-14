import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';
interface Favorite {
  id: number;
  name: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (pokemon: Favorite) => void;
  removeFavorite: (pokemonId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [pokemonToRemove, setPokemonToRemove] = useState<number | null>(null);

  const addFavorite = (pokemon: Favorite) => {
    setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
  };

  const confirmRemoveFavorite = (pokemonId: number) => {
    setPokemonToRemove(pokemonId);
    setShowConfirmation(true);
  };

  const handleRemoveFavorite = () => {
    if (pokemonToRemove !== null) {
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== pokemonToRemove));
    }
    setShowConfirmation(false);
    setPokemonToRemove(null);
  };

  const cancelRemoveFavorite = () => {
    setShowConfirmation(false);
    setPokemonToRemove(null);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite: confirmRemoveFavorite }}>
      {children}
      <Modal show={showConfirmation} onHide={cancelRemoveFavorite} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this Pokémon from favorites?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelRemoveFavorite}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveFavorite}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};