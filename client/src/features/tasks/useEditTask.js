import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { updateTask } from './tasksSlice';
import { loadProject } from '../projects/projectsSlice';

export const useEditTask = ({ taskInfo, toggle }) => {
  const [users, setUsers] = useState([]);

  const {
    currentProject,
    currentColumn,
    creator,
    name,
    description,
    assignedTo,
    _id,
  } = taskInfo;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentProject,
      currentColumn,
      creator,
      name,
      description,
      assignedTo,
    },
  });

  useEffect(() => {
    dispatch(loadProject(currentProject)).then((res) =>
      setUsers(res.payload.data.project.team)
    );
  }, [dispatch, currentProject]);

  const handleSubmitEditTaskForm = (taskInfo) => {
    dispatch(updateTask({ _id, taskInfo }));
    toggle();
  };

  return [
    register,
    handleSubmit,
    handleSubmitEditTaskForm,
    users,
    control,
    errors,
  ];
};
