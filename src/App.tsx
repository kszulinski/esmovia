import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Login from './pages/login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
