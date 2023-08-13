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
import authSlice, {
  authPersistConfig
} from '../auth/infraestructure/slices/AuthSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice)
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore: any = (preloadedState?: PreloadedState<RootState>) => {
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

export const store = setupStore();

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, auths: UsersState}
export type AppDispatch = typeof store.dispatch;
