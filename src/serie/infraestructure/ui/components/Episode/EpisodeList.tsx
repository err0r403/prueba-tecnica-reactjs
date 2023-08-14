import { AppDispatch, RootState } from '../../../../../store';
import { Box, Typography } from '@mui/material';
import { setFilter, setPage } from '../../../slices/EpisodeSlice';
import { useDispatch, useSelector } from 'react-redux';

import CustomSearchInput from '../CustomSearchInput';
import { EpisodeListItem } from './EpisodeListItem';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import { fetchEpisodes } from '../../../slices/EpisodeSlice';
import { useEffect } from 'react';

const EpisodeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => state.episode.results);
  const name = useSelector((state: RootState) => state.episode.filter.name);
  const page = useSelector((state: RootState) => state.episode.pagination.page);
  const pages = useSelector(
    (state: RootState) => state.episode.pagination.pages
  );
  const count = useSelector(
    (state: RootState) => state.episode.pagination.count
  );
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value === page) return;
    dispatch(setPage(value));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value));
  };

  useEffect(() => {
    if (!name?.length) return;
    const timer = setTimeout(() => {
      dispatch(
        fetchEpisodes({
          page,
          name: name
        })
      );
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [name, page, dispatch]);

  useEffect(() => {
    if (name?.length) return;
    dispatch(fetchEpisodes({ page }));
  }, [name, page, dispatch]);
  return (
    <>
      <Box pt={2}>
        <Typography variant="h4" color="primary" sx={{}}>
          Episodes List ({count})
        </Typography>
      </Box>
      <Box pt={2}>
        <CustomSearchInput
          value={name ?? ''}
          handleSearch={handleSearch}
          clearSearch={() => {
            dispatch(setFilter(''));
          }}
        />
      </Box>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper'
        }}>
        {results.map((episode) => (
          <EpisodeListItem key={episode.id} {...episode} />
        ))}
      </List>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
        count={pages}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />
    </>
  );
};

export default EpisodeList;
