import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  loadProjects,
  selectProjects,
  selectProjectsLoading,
} from './projectsSlice';

export const useProjects = () => {
  const projects = useSelector(selectProjects);
  const projectsLoading = useSelector(selectProjectsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!projects.length) {
      dispatch(loadProjects());
    }
  }, [dispatch, projects.length]);

  return [projects, projectsLoading];
};
