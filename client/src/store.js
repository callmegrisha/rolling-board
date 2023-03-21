import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

import * as api from './config';
import { authReducer } from './features/auth/authSlice';
import { projectsReducer } from './features/projects/projectsSlice';
import { profileReducer } from './features/profile/profileSlice';
import { columnsReducer } from './features/columns/columnsSlice';
import { tasksReducer } from './features/tasks/tasksSlice';

const initialState = {
  auth: authReducer,
  projects: projectsReducer,
  profile: profileReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
};

const instance = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    'token'
  )}`;
  return config;
});

const store = configureStore({
  reducer: initialState,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: instance,
          api,
        },
      },
      serializableCheck: false,
    }),
});

export { store };
