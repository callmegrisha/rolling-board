import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { Column } from '../../components/Column';
import { ColumnsLoader } from './ColumnsLoader';
import {
  loadColumns,
  selectColumns,
  selectColumnsStatus,
} from './columnsSlice';
import {
  loadTasks,
  selectAllTasks,
  deleteTask,
  createTask,
} from '../tasks/tasksSlice';
import { selectCurrentUser } from '../auth/authSlice';
import './ColumnsList.css';

export const ColumnsList = ({ projectId, projectCreator }) => {
  const status = useSelector(selectColumnsStatus);
  const columns = useSelector(selectColumns);
  const tasks = useSelector(selectAllTasks);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadColumns(projectId));
    dispatch(loadTasks(projectId));
  }, [dispatch, projectId]);

  const handleDragEnd = (args) => {
    if (!args.destination) return;
    const {
      destination: { droppableId },
      draggableId,
    } = args;

    const { _id, currentColumn, ...info } = tasks.filter(
      (task) => task._id === draggableId
    )[0];

    const newTask = {
      currentColumn: droppableId,
      ...info,
    };

    dispatch(deleteTask(_id));
    dispatch(createTask(newTask));
  };

  return (
    <DragDropContext onDragEnd={(args) => handleDragEnd(args)}>
      <div className='board__columns'>
        {status === 'loading' ? (
          <ColumnsLoader />
        ) : (
          columns.map((column) => (
            <Column
              key={column._id}
              {...column}
              className='board__column'
              tasks={tasks}
            />
          ))
        )}
        {projectCreator === user && <Column className='board__column' empty />}
      </div>
    </DragDropContext>
  );
};
