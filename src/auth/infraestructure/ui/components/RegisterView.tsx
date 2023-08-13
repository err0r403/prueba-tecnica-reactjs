import Layout from '../../../../layout/Layout';
import { Navigate } from 'react-router-dom';
import { RegisterForm } from '../forms/RegisterForm';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';

export default function RegisterView() {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
}
