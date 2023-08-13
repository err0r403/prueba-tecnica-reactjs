import './App.css';

import { LOGIN_URL, REGISTER_URL } from './auth/infraestructure/ui/constants';
import { Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import LoginView from './auth/infraestructure/ui/components/LoginView';
import { ProtectedRoute } from './auth/infraestructure/ui/ProtectedRoute';
import React from 'react';
import RegisterView from './auth/infraestructure/ui/components/RegisterView';

const Default = () => (
  <Layout>
    <div>Default</div>
  </Layout>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Default />
          </ProtectedRoute>
        }
      />
      <Route path={REGISTER_URL} element={<RegisterView />} />
      <Route path={LOGIN_URL} element={<LoginView />} />
    </Routes>
  );
}

export default App;
