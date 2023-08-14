import * as React from 'react';

import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

interface CustomSearchInputProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  value: string;
}

export default function CustomSearchInput({
  handleSearch,
  clearSearch,
  value
}: CustomSearchInputProps): JSX.Element {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        mb: '4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        onChange={handleSearch}
        value={value}
        placeholder="Search by name"
        inputProps={{ 'aria-label': 'search by name' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {value.length ? (
        <Button
          type="button"
          sx={{ p: '10px' }}
          aria-label="clear search"
          onClick={clearSearch}>
          <CloseIcon />
        </Button>
      ) : null}
    </Paper>
  );
}
