import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: any[];
  addFavorite: (item: any) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (item: any) => {
    setFavorites([...favorites, item]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
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

