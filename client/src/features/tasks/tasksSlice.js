import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadTasks = createAsyncThunk(
  '@@tasks/loadTasks',
  async (projectId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(
        api.ALL_TASKS_IN_PROJECT + `/${projectId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadTasksByCurrentUser = createAsyncThunk(
  '@@tasks/loadTasksByCurrentUser',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(api.ALL_TASKS_BY_USER);

      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loadTask = createAsyncThunk(
  '@@tasks/loadTask',
  async (taskId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.get(api.TASKS + `/${taskId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createTask = createAsyncThunk(
  '@@tasks/createTask',
  async (taskObject, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.post(api.TASKS, taskObject);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateTask = createAsyncThunk(
  '@@tasks/updateTask',
  async ({ _id, taskInfo }, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.patch(api.TASKS + `/${_id}`, taskInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteTask = createAsyncThunk(
  '@@tasks/deleteTask',
  async (taskId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = await client.delete(api.TASKS + `/${taskId}`);
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const initialState = {
  status: 'idle',
  entities: [],
  tasksByUser: [],
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // load tasks
    builder.addCase(loadTasks.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadTasks.rejected, (state, action) => {
      state.status = 'rejected';
      console.log('loadProject.rejected', action);
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.status = 'received';
      state.entities = action.payload;
    });
    // load tasks by current user
    builder.addCase(loadTasksByCurrentUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadTasksByCurrentUser.rejected, (state, action) => {
      state.status = 'rejected';
      console.log('loadProject.rejected', action);
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadTasksByCurrentUser.fulfilled, (state, action) => {
      state.status = 'received';
      state.tasksByUser = action.payload;
    });
    // create task
    builder.addCase(createTask.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.status = 'rejected';
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.status = 'received';
      state.entities.push(action.payload);
    });
    // update task
    builder.addCase(updateTask.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.status = 'rejected';
      console.log('loadProject.rejected', action);
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.entities.findIndex(
        (task) => task._id === action.payload._id
      );
      state.status = 'received';
      state.entities[index] = action.payload;
    });
    // load task
    builder.addCase(loadTask.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadTask.rejected, (state, action) => {
      state.status = 'rejected';
      console.log('loadProject.rejected', action);
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadTask.fulfilled, (state) => {
      state.status = 'received';
    });
    // delete task
    builder.addCase(deleteTask.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.status = 'rejected';
      console.log('loadProject.rejected', action);
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { taskId } = action.payload;
      state.status = 'received';
      state.entities = state.entities.filter((task) => task._id !== taskId);
    });
  },
});

export const tasksReducer = tasksSlice.reducer;

// selectors
export const selectAllTasks = (state) => state.tasks.entities;
export const selectAllTasksByCurrentUser = (state) => state.tasks.tasksByUser;
