import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadProjects = createAsyncThunk(
  '@@projects/loadProjects',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      const data = await client.get(api.ALL_PROJECTS_BY_USER);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createProject = createAsyncThunk(
  '@@projects/createProject',
  async (project, { extra: { client, api }, rejectWithValue }) => {
    try {
      const data = await client.post(api.PROJECTS, project);

      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loadProject = createAsyncThunk(
  '@@projects/loadProject',
  async (projectId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const data = await client.get(api.PROJECTS + `/${projectId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateProject = createAsyncThunk(
  '@@projects/updateProject',
  async (projectObject, { extra: { client, api }, rejectWithValue }) => {
    try {
      const data = await client.patch(
        api.PROJECTS + `/${projectObject.projectId}`,
        projectObject
      );

      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const deleteProject = createAsyncThunk(
  '@@projects/deleteProject',
  async (projectId, { extra: { client, api }, rejectWithValue }) => {
    try {
      const data = await client.delete(api.PROJECTS + `/${projectId}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  status: 'idle',
  entities: [],
  projectInfo: {},
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create project
    builder.addCase(createProject.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.status = 'received';
      state.entities.push(data);
    });
    // load projects
    builder.addCase(loadProjects.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadProjects.rejected, (state, action) => {
      state.status = 'rejected';
      console.log('loadProject.rejected', action);
      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadProjects.fulfilled, (state, action) => {
      state.status = 'received';
      state.entities = action.payload.data;
    });
    // load project
    builder.addCase(loadProject.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadProject.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(loadProject.fulfilled, (state) => {
      state.status = 'received';
    });
    // update project
    builder.addCase(updateProject.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { data } = action.payload;
      const index = state.entities.findIndex(
        (project) => project._id === data._id
      );
      state.status = 'received';
      state.entities[index] = data;
    });
    // delete project
    builder.addCase(deleteProject.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.status = 'rejected';

      if (Array.isArray(action.payload.data)) {
        state.error = action.payload.data.map((error) => error.msg);
      } else {
        state.error = action.payload.data.message;
      }
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      const { projectId } = action.payload.data;
      state.status = 'received';
      state.entities = state.entities.filter(
        (project) => project._id !== projectId
      );
    });
  },
});

export const projectsReducer = projectsSlice.reducer;

// selectors
export const selectProjectInfo = (state) => state.projects.projectInfo;
export const selectProjects = (state) => state.projects.entities;
export const selectProjectsLoading = (state) => state.projects.status;
export const selectProjectsError = (state) => state.projects.error;
