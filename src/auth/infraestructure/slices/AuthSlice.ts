import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthApi } from '../adapters/api/AuthApi';
import AuthController from '../controllers/AuthController';
import { LoginUserDTO } from '../../domain/dto/LoginUserDTO';
import { RegisterUserDTO } from '../../domain/dto/RegisterUserDTO';
import storage from 'redux-persist/lib/storage';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: undefined
};

export const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  blacklist: ['error']
};

const authApi = new AuthApi();

const authController = new AuthController(authApi);

export const loginUser = createAsyncThunk(
  'content/loginUser',
  async (loginUserDTO: LoginUserDTO) => {
    return await authController.loginUser(loginUserDTO);
  }
);

export const registerUser = createAsyncThunk(
  'content/registerUser',
  async (registerUserDTO: RegisterUserDTO) => {
    return await authController.registerUser(registerUserDTO);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Invalid credentials';
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { logoutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users.users

export default authSlice.reducer;
