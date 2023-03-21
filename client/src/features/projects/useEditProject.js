import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, selectCurrentUser } from '../auth/authSlice';
import { updateProject } from './projectsSlice';

export const useEditProject = (projectInfo) => {
  const [users, setUsers] = useState([]);
  const currentUserId = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      creator: currentUserId,
      projectId: projectInfo.id,
      name: projectInfo.name,
      description: projectInfo.description,
      team: projectInfo.team,
    },
  });

  const handleSubmitProjectForm = (data) => {
    dispatch(updateProject(data));
  };

  useEffect(() => {
    dispatch(getAllUsers()).then((res) => setUsers(res.payload));
  }, [dispatch]);

  return [
    register,
    handleSubmit,
    handleSubmitProjectForm,
    users,
    control,
    errors,
  ];
};
