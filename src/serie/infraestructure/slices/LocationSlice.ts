import { Location, LocationFilter } from '../../domain/entities/Location';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LocationApi } from '../adapters/api/LocationApi';
import LocationController from '../controllers/LocationController';
import storage from 'redux-persist/lib/storage';

interface LocationState {
  results: Location[];
  isLoading: boolean;
  error: string | undefined;
  pagination: {
    count: number;
    page: number;
    pages: number;
  };
  filter: LocationFilter;
  location: Location | undefined;
}

const initialState: LocationState = {
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
  location: undefined
};

export const locationPersistConfig = {
  key: 'location',
  version: 1,
  storage,
  blacklist: ['error']
};

const locationApi = new LocationApi();

const locationController = new LocationController(locationApi);

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async (locationFilter: LocationFilter) => {
    const response = await locationController.getAll(locationFilter);
    return {
      results: response.results,
      pagination: {
        count: response.info.count,
        page: locationFilter.page,
        pages: response.info.pages
      }
    };
  }
);

export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (id: number) => {
    const response = await locationController.getById(id);
    return {
      location: response
    };
  }
);

export const locationSlice = createSlice({
  name: 'location',
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
    builder.addCase(fetchLocations.pending, (state) => {
      if (state.results.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload.results;
      state.pagination = {
        count: action.payload.pagination.count,
        page: action.payload.pagination.page,
        pages: action.payload.pagination.pages
      };
    });
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.isLoading = false;
      state.pagination = initialState.pagination;
      state.results = initialState.results;
    });

    builder.addCase(fetchLocation.pending, (state) => {
      if (state.results.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.location = action.payload.location;
    });
    builder.addCase(fetchLocation.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const { setFilter, setPage } = locationSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users.users

export default locationSlice.reducer;
