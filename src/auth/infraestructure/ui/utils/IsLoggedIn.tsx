import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export const IsLoggedIn = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (token) {
    return children;
  }
  return null;
};
