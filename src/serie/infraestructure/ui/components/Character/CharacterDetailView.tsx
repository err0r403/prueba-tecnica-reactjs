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
import ChildFriendly from '@mui/icons-material/ChildFriendly';
import Image from 'mui-image';
import Layout from '../../../../../layout/Layout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import StreamIcon from '@mui/icons-material/Stream';
import { fetchCharacter } from '../../../slices/CharacterSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

const CharacterContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export function CharacterDetailView() {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const character = useSelector(
    (state: RootState) => state.character.character
  );

  useEffect(() => {
    dispatch(fetchCharacter(parseInt(id!)));
  }, [id, dispatch]);

  const onErrorImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.onerror = null;
    event.target.src =
      'https://cms-cdn.placeholder.co/warehouse_for_rent_19b6e42cf3.jpg?width=3840';
  };
  return (
    <Layout>
      <>
        <Helmet>
          <title>RentApp | Character</title>
        </Helmet>
        <Box pt={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              fontWeight={'bold'}
              color="primary"
              href="/">
              Home
            </Link>
            <Typography color="inherit" fontWeight={'bold'}>
              Character
            </Typography>
            <Typography color="inherit">{character?.name}</Typography>
          </Breadcrumbs>

          <CharacterContainer pt={2}>
            <Box maxHeight={'500px'} pb={2}>
              <Image
                style={{ borderRadius: '10px' }}
                src={character?.image!}
                alt={character?.name}
                onError={onErrorImg}
              />
            </Box>
            <Box
              flex={1}
              pb={2}
              sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box px={2}>
                <Typography
                  variant="h4"
                  fontWeight={'bold'}
                  sx={{}}
                  color={'primary'}>
                  {character?.name}
                </Typography>
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
                  <Typography>{character?.id}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <StreamIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ width: '150px' }}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    primary="Status"
                  />
                  <Typography>{character?.status}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <BloodtypeIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ width: '150px' }}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    primary="Specie"
                  />
                  <Typography>{character?.species}</Typography>
                </ListItem>
                {/* <ListItem>
                <ListItemText sx={{ width: '150px' }} primary="Type" />
                <Typography>{character?.type}</Typography>
              </ListItem> */}
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ width: '150px' }}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    primary="Last seen"
                  />
                  <Typography>{character?.location.name}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <ChildFriendly />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ width: '150px' }}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    primary="Born in"
                  />
                  <Typography>{character?.origin.name}</Typography>
                </ListItem>
              </List>
            </Box>
          </CharacterContainer>
        </Box>
      </>
    </Layout>
  );
}
