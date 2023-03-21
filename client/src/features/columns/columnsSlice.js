import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadColumns = createAsyncThunk(
  '@@columns/loadColumns',
  async (projectId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(
        api.ALL_COLUMNS_IN_PROJECT + `/${projectId}`
      );

      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const loadColumn = createAsyncThunk(
  '@@columns/loadColumn',
  async (columnId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(api.COLUMNS + `/${columnId}`);

      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const createColumn = createAsyncThunk(
  '@@columns/createColumn',
  async (columnObj, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.post(api.COLUMNS, columnObj);
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const updateColumn = createAsyncThunk(
  '@@columns/updateColumn',
  async (
    { columnId, creator, name, project },
    { extra: { client, api }, rejectWithValue }
  ) => {
    try {
      const columnObj = {
        creator,
        name,
        project,
      };

      const { data } = await client.patch(
        api.COLUMNS + `/${columnId}`,
        columnObj
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  '@@columns/deleteColumn',
  async (columnId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.delete(api.COLUMNS + `/${columnId}`);

      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const initialState = {
  status: 'idle',
  entities: [],
  error: null,
};

export const columnsSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // load columns
    builder.addCase(loadColumns.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadColumns.rejected, (state, action) => {
      state.status = 'rejected';
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadColumns.fulfilled, (state, action) => {
      state.status = 'received';
      state.entities = action.payload;
    });
    // create column
    builder.addCase(createColumn.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createColumn.rejected, (state, action) => {
      state.status = 'rejected';
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(createColumn.fulfilled, (state, action) => {
      const { _id, project, name, __v, creator } = action.payload;
      const column = {
        _id,
        project,
        creator,
        name,
        __v,
      };
      state.status = 'received';
      state.entities.push(column);
    });
    // update column
    builder.addCase(updateColumn.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateColumn.rejected, (state, action) => {
      state.status = 'rejected';
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(updateColumn.fulfilled, (state, action) => {
      const data = action.payload;
      const index = state.entities.findIndex(
        (column) => column._id === data._id
      );
      state.status = 'received';
      state.entities[index] = data;
    });
    // delete column
    builder.addCase(deleteColumn.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteColumn.rejected, (state, action) => {
      state.status = 'rejected';
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      const { columnId } = action.payload;
      state.status = 'received';
      state.entities = state.entities.filter(
        (column) => column._id !== columnId
      );
    });
  },
});

export const columnsReducer = columnsSlice.reducer;

// selectors
export const selectColumns = (state) => state.columns.entities;
export const selectColumnsStatus = (state) => state.columns.status;
