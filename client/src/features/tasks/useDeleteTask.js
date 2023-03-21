import { useDispatch } from 'react-redux';
import { deleteTask } from './tasksSlice';

export const useDeleteTask = (taskId) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    if (window.confirm('A you sure?')) {
      dispatch(deleteTask(taskId));
    }
  };

  return [handleDeleteTask];
};
