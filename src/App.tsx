import './App.css';

import {
  CHARACTER_DETAIL_URL,
  EPISODE_DETAIL_URL,
  LOCATION_DETAIL_URL
} from './serie/infraestructure/ui/utils/constants';
import { LOGIN_URL, REGISTER_URL } from './auth/infraestructure/ui/constants';
import { Route, Routes } from 'react-router-dom';

import { CharacterDetailView } from './serie/infraestructure/ui/components/Character/CharacterDetailView';
import { EpisodeDetailView } from './serie/infraestructure/ui/components/Episode/EpisodeDetailView';
import HomeView from './serie/infraestructure/ui/components/HomeView';
import { LocationDetailView } from './serie/infraestructure/ui/components/Location/LocationDetailView';
import LoginView from './auth/infraestructure/ui/components/LoginView';
import { ProtectedRoute } from './auth/infraestructure/ui/ProtectedRoute';
import React from 'react';
import RegisterView from './auth/infraestructure/ui/components/RegisterView';

function App() {
  return (
    <Routes>
      <Route path={REGISTER_URL} element={<RegisterView />} />
      <Route path={LOGIN_URL} element={<LoginView />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeView />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${CHARACTER_DETAIL_URL}:id`}
        element={
          <ProtectedRoute>
            <CharacterDetailView />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${EPISODE_DETAIL_URL}:id`}
        element={
          <ProtectedRoute>
            <EpisodeDetailView />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${LOCATION_DETAIL_URL}:id`}
        element={
          <ProtectedRoute>
            <LocationDetailView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
