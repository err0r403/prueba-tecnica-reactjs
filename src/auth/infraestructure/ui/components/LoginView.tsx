import Layout from '../../../../layout/Layout';
import { LoginForm } from '../forms/LoginForm';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';

import { Helmet } from 'react-helmet-async';

export default function LoginView() {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <>
        <Helmet>
          <title>RentApp | Login</title>
        </Helmet>
        <LoginForm />
      </>
    </Layout>
  );
}
