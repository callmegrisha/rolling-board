import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadProfileInfo = createAsyncThunk(
  '@@profile/loadCurrentUser',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(api.CURRENT_USER);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  '@@profile/uploadAvatar',
  async (formData, { extra: { client, api }, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await client.post(api.UPLOAD_AVATAR, formData, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateProfile = createAsyncThunk(
  '@@profile/updateCurrentUser',
  async (userData, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.patch(api.USERS, userData);
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const initialState = {
  status: 'idle',
  userInfo: {},
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // load current user
    builder.addCase(loadProfileInfo.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadProfileInfo.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadProfileInfo.fulfilled, (state, action) => {
      state.status = 'received';
      state.userInfo = action.payload;
    });
    // upload avatar
    builder.addCase(uploadAvatar.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.status = 'received';
      console.log(action.payload);
    });
    // update user
    builder.addCase(updateProfile.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = 'received';
      state.userInfo = action.payload;
    });
  },
});

export const profileReducer = profileSlice.reducer;

// selectors
export const selectProfileInfo = (state) => state.profile.userInfo;
