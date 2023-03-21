import { useDispatch } from 'react-redux';
import { deleteColumn } from './columnsSlice';

export const useDeleteColumn = (columnId) => {
  const dispatch = useDispatch();

  const handleDeleteColumn = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteColumn(columnId));
    }
  };

  return [handleDeleteColumn];
};
