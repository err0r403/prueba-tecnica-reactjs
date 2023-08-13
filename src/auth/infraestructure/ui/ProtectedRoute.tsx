import { LOGIN_URL } from './constants';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    // user is not authenticated
    return <Navigate to={LOGIN_URL} />;
  }
  return children;
};
