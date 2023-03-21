import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUser, getAllUsers } from '../auth/authSlice';
import { createProject, selectProjectsError } from './projectsSlice';

export const useNewProject = ({ toggle }) => {
  const [users, setUsers] = useState([]);
  const currentUserId = useSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      creator: currentUserId,
      name: '',
      description: '',
      team: [],
    },
  });

  const error = useSelector(selectProjectsError);
  const dispatch = useDispatch();

  const handleSubmitProjectForm = (data) => {
    dispatch(createProject(data));
    toggle();
  };

  useEffect(() => {
    dispatch(getAllUsers()).then((res) => setUsers(res.payload));
  }, [dispatch, error]);

  return [
    register,
    handleSubmit,
    handleSubmitProjectForm,
    users,
    control,
    errors,
  ];
};
