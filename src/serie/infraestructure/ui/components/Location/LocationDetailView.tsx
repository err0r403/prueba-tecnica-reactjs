import { AppDispatch, RootState } from '../../../../../store';
import {
  Box,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import Layout from '../../../../../layout/Layout';
import NumbersIcon from '@mui/icons-material/Numbers';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { fetchLocation } from '../../../slices/LocationSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LocationContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export function LocationDetailView() {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.location.location);

  useEffect(() => {
    dispatch(fetchLocation(parseInt(id!)));
  }, [id, dispatch]);

  return (
    <Layout>
      <Box pt={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" fontWeight={'bold'} color="primary" href="/">
            Home
          </Link>
          <Typography color="inherit" fontWeight={'bold'}>
            Location
          </Typography>
          <Typography color="inherit">{location?.name}</Typography>
        </Breadcrumbs>

        <LocationContainer pt={2}>
          <Box flex={1}>
            <Box flex={1} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box flex={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box px={2}>
                  <Typography
                    variant="h4"
                    fontWeight={'bold'}
                    sx={{}}
                    color={'primary'}>
                    {location?.name}
                  </Typography>
                </Box>
              </Box>
              <List dense={false} sx={{ flex: 1, py: 0, pt: 2 }}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <NumbersIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ width: '150px' }}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    primary="ID"
                  />
                  <Typography>{location?.id}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <BloodtypeIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ width: '150px' }}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    primary="Type"
                  />
                  <Typography>{location?.type}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <ViewInArIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ width: '150px' }}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    primary="Dimension"
                  />
                  <Typography>{location?.dimension}</Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </LocationContainer>
      </Box>
    </Layout>
  );
}
