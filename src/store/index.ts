import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';
import authReducer, {
  authPersistConfig
} from '../auth/infraestructure/slices/AuthSlice';
import characterReducer, {
  characterPersistConfig
} from '../serie/infraestructure/slices/CharacterSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import episodeReducer, {
  episodePersistConfig
} from '../serie/infraestructure/slices/EpisodeSlice';
import locationReducer, {
  locationPersistConfig
} from '../serie/infraestructure/slices/LocationSlice';

import type { PreloadedState } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'character', 'episode', 'location']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  character: persistReducer(characterPersistConfig, characterReducer),
  episode: persistReducer(episodePersistConfig, episodeReducer),
  location: persistReducer(locationPersistConfig, locationReducer)
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, auths: UsersState}
export type AppDispatch = typeof store.dispatch;
