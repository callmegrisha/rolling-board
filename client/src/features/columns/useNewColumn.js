import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { createColumn } from './columnsSlice';

export const useNewColumn = (projectId, toggle) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      project: projectId,
      name: '',
    },
  });

  const handleSubmitNewColumn = (data) => {
    dispatch(createColumn(data));
    toggle();
  };

  return [register, handleSubmit, handleSubmitNewColumn, errors];
};
