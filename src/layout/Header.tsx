import AppBar from '@mui/material/AppBar';
import { AppDispatch } from '../store';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import { LOGIN_URL } from '../auth/infraestructure/ui/constants';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { logoutUser } from '../auth/infraestructure/slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IsLoggedIn } from '../auth/infraestructure/ui/utils/IsLoggedIn';

export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate(LOGIN_URL);
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          RentApp
        </Typography>
        <IsLoggedIn>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </IsLoggedIn>
      </Toolbar>
    </AppBar>
  );
}
