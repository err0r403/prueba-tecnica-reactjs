import { Character, CharacterFilter } from '../../domain/entities/Character';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CharacterApi } from '../adapters/api/CharacterApi';
import CharacterController from '../controllers/CharacterController';
import { RootState } from '../../../store';
import storage from 'redux-persist/lib/storage';

interface CharacterState {
  results: Character[];
  isLoading: boolean;
  error: string | undefined;
  pagination: {
    count: number;
    page: number;
    pages: number;
  };
  filter: CharacterFilter;
  character: Character | undefined;
}

const initialState: CharacterState = {
  results: [],
  isLoading: false,
  error: undefined,
  pagination: {
    count: 0,
    page: 1,
    pages: 1
  },
  filter: {
    page: 1
  },
  character: undefined
};

export const characterPersistConfig = {
  key: 'character',
  version: 1,
  storage,
  blacklist: ['error']
};

const characterApi = new CharacterApi();

const characterController = new CharacterController(characterApi);

export const fetchCharacters = createAsyncThunk(
  'character/fetchCharacters',
  async (characterFilter: CharacterFilter) => {
    const response = await characterController.getAll(characterFilter);
    return {
      results: response.results,
      pagination: {
        count: response.info.count,
        page: characterFilter.page,
        pages: response.info.pages
      }
    };
  }
);

export const fetchCharacter = createAsyncThunk(
  'character/fetchCharacter',
  async (id: number) => {
    const response = await characterController.getById(id);
    return {
      character: response
    };
  }
);

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        page: action.payload
      };
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        name: action.payload.length ? action.payload : undefined
      };
      state.pagination = {
        ...state.pagination,
        page: 1
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state) => {
      if (state.results.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload.results;
      state.pagination = {
        count: action.payload.pagination.count,
        page: action.payload.pagination.page,
        pages: action.payload.pagination.pages
      };
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.isLoading = false;
      state.pagination = initialState.pagination;
      state.results = initialState.results;
    });

    builder.addCase(fetchCharacter.pending, (state) => {
      if (state.results.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(fetchCharacter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.character = action.payload.character;
    });
    builder.addCase(fetchCharacter.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const { setFilter, setPage } = characterSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users.users

export default characterSlice.reducer;
