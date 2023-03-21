import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { loadProject } from '../projects/projectsSlice';
import { selectCurrentUser } from '../auth/authSlice';
import { createTask } from './tasksSlice';

export const useNewTask = ({ projectId, columnId, toggle }) => {
  const [users, setUsers] = useState([]);
  const userId = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentProject: projectId,
      currentColumn: columnId,
      creator: userId,
      name: '',
      description: '',
      assignedTo: [],
    },
  });

  useEffect(() => {
    dispatch(loadProject(projectId)).then((res) =>
      setUsers(res.payload.data.project.team)
    );
  }, [dispatch, projectId]);

  const handleSubmitTaskForm = (data) => {
    dispatch(createTask(data));
    toggle();
  };

  return [register, handleSubmit, handleSubmitTaskForm, users, control, errors];
};
