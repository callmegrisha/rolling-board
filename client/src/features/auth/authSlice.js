import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  '@@auth/register',
  async (
    { name, login, email, password },
    { extra: { client, api }, rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const userObject = {
        name,
        login,
        email,
        password,
      };

      const { data } = await client.post(api.USERS, userObject, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  '@@auth/login',
  async (userObject, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.post(api.USERS_LOGIN, userObject);

      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loadCurrentUser = createAsyncThunk(
  '@@auth/loadCurrentUser',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(api.CURRENT_USER);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  '@@auth/getAllUsers',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(api.USERS);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  status: 'idle',
  userId: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('logout', state);
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { _id } = action.payload;
      state.status = 'received';
      state.userId = _id;
    });
    // login user
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { _id } = action.payload;
      state.status = 'received';
      state.userId = _id;
    });
    // load current user
    builder.addCase(loadCurrentUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadCurrentUser.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.status = 'received';
      state.userId = action.payload._id;
    });
    // get all users
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(getAllUsers.fulfilled, (state) => {
      state.status = 'received';
    });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

// selectors
export const selectCurrentUser = (state) => state.auth.userId;
export const selectIsUserAuthenticated = (state) => Boolean(state.auth.userId);
export const selectAuthInfo = (state) => state.auth;
export const selectAuthStatus = (state) => state.status;
