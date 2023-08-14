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

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Layout from '../../../../../layout/Layout';
import NumbersIcon from '@mui/icons-material/Numbers';
import VideocamIcon from '@mui/icons-material/Videocam';
import { fetchEpisode } from '../../../slices/EpisodeSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EpisodeContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export function EpisodeDetailView() {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const episode = useSelector((state: RootState) => state.episode.episode);

  useEffect(() => {
    dispatch(fetchEpisode(parseInt(id!)));
  }, [id, dispatch]);

  return (
    <Layout>
      <Box pt={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" fontWeight={'bold'} color="primary" href="/">
            Home
          </Link>
          <Typography color="inherit" fontWeight={'bold'}>
            Episode
          </Typography>
          <Typography color="inherit">{episode?.name}</Typography>
        </Breadcrumbs>

        <EpisodeContainer pt={2}>
          <Box flex={1}>
            <Box flex={1} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box flex={1}>
                <Box flex={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box px={2}>
                    <Typography
                      variant="h4"
                      fontWeight={'bold'}
                      sx={{}}
                      color={'primary'}>
                      {episode?.name}
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
                    <Typography>{episode?.id}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ width: '150px' }}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      primary="Air date"
                    />
                    <Typography>{episode?.air_date}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <VideocamIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ width: '150px' }}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      primary="Episode"
                    />
                    <Typography>{episode?.episode}</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </EpisodeContainer>
      </Box>
    </Layout>
  );
}
