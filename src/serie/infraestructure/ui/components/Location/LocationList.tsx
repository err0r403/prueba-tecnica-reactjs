import { AppDispatch, RootState } from '../../../../../store';
import { Box, Typography } from '@mui/material';
import { setFilter, setPage } from '../../../slices/LocationSlice';
import { useDispatch, useSelector } from 'react-redux';

import CustomSearchInput from '../CustomSearchInput';
import List from '@mui/material/List';
import { LocationListItem } from './LocationListItem';
import Pagination from '@mui/material/Pagination';
import { fetchLocations } from '../../../slices/LocationSlice';
import { useEffect } from 'react';

const LocationList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => state.location.results);
  const name = useSelector((state: RootState) => state.location.filter.name);
  const page = useSelector(
    (state: RootState) => state.location.pagination.page
  );
  const pages = useSelector(
    (state: RootState) => state.location.pagination.pages
  );
  const count = useSelector(
    (state: RootState) => state.location.pagination.count
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
        fetchLocations({
          page,
          name: name
        })
      );
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [page, name, dispatch]);

  useEffect(() => {
    if (name?.length) return;
    dispatch(fetchLocations({ page }));
  }, [page, name, dispatch]);
  return (
    <>
      <Box pt={2}>
        <Typography variant="h4" color="primary" sx={{}}>
          Locations List ({count})
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
        {results.map((location) => (
          <LocationListItem key={location.id} {...location} />
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

export default LocationList;
