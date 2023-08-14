import { AppDispatch, RootState } from '../../../../../store';
import { Box, Typography } from '@mui/material';
import {
  fetchCharacters,
  setFilter,
  setPage
} from '../../../slices/CharacterSlice';
import { useDispatch, useSelector } from 'react-redux';

import { CharacterListItem } from './CharacterListItem';
import CustomSearchInput from '../CustomSearchInput';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';

const CharacterList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => state.character.results);
  const name = useSelector((state: RootState) => state.character.filter.name);
  const page = useSelector(
    (state: RootState) => state.character.pagination.page
  );
  const pages = useSelector(
    (state: RootState) => state.character.pagination.pages
  );
  const count = useSelector(
    (state: RootState) => state.character.pagination.count
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
        fetchCharacters({
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
    dispatch(fetchCharacters({ page }));
  }, [name, page, dispatch]);
  return (
    <>
      <Box pt={2}>
        <Typography variant="h4" color="primary" sx={{}}>
          Characters List ({count})
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
        {results.map((character) => (
          <CharacterListItem key={character.id} {...character} />
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

export default CharacterList;
