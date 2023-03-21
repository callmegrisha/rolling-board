import { useDispatch } from 'react-redux';
import { deleteProject } from './projectsSlice';

export const useDeleteProject = (projectId) => {
  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProject(projectId));
    }
  };

  return [handleDeleteProject];
};
