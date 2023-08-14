import { Episode, EpisodeFilter } from '../../domain/entities/Episode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { EpisodeApi } from '../adapters/api/EpisodeApi';
import EpisodeController from '../controllers/EpisodeController';
import storage from 'redux-persist/lib/storage';

interface EpisodeState {
  results: Episode[];
  isLoading: boolean;
  error: string | undefined;
  pagination: {
    count: number;
    page: number;
    pages: number;
  };
  filter: EpisodeFilter;
  episode: Episode | undefined;
}

const initialState: EpisodeState = {
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
  episode: undefined
};

export const episodePersistConfig = {
  key: 'episode',
  version: 1,
  storage,
  blacklist: ['error']
};

const episodeApi = new EpisodeApi();

const episodeController = new EpisodeController(episodeApi);

export const fetchEpisodes = createAsyncThunk(
  'episode/fetchEpisodes',
  async (episodeFilter: EpisodeFilter) => {
    const response = await episodeController.getAll(episodeFilter);
    return {
      results: response.results,
      pagination: {
        count: response.info.count,
        page: episodeFilter.page,
        pages: response.info.pages
      }
    };
  }
);

export const fetchEpisode = createAsyncThunk(
  'episode/fetchEpisode',
  async (id: number) => {
    const response = await episodeController.getById(id);
    return {
      episode: response
    };
  }
);

export const episodeSlice = createSlice({
  name: 'episode',
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
    builder.addCase(fetchEpisodes.pending, (state) => {
      if (state.results.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload.results;
      state.pagination = {
        count: action.payload.pagination.count,
        page: action.payload.pagination.page,
        pages: action.payload.pagination.pages
      };
    });
    builder.addCase(fetchEpisodes.rejected, (state, action) => {
      state.isLoading = false;
      state.pagination = initialState.pagination;
      state.results = initialState.results;
    });

    builder.addCase(fetchEpisode.pending, (state) => {
      if (state.results.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(fetchEpisode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.episode = action.payload.episode;
    });
    builder.addCase(fetchEpisode.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const { setFilter, setPage } = episodeSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users.users

export default episodeSlice.reducer;
