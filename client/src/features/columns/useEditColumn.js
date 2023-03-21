import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateColumn } from './columnsSlice';

export const useEditColumn = (columnId, toggle, name, project) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      columnId,
      project,
      name,
    },
  });

  const handleSubmitEditColumn = (data) => {
    dispatch(updateColumn(data));
    toggle();
  };

  return [register, handleSubmit, handleSubmitEditColumn, errors];
};
