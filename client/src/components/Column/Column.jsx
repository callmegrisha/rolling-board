import classNames from 'classnames';
import { lazy, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Task } from '../Task';
import { NewColumn } from '../../features/columns/NewColumn';
import { EditColumn } from '../../features/columns/EditColumn';
import { useDeleteColumn } from '../../features/columns/useDeleteColumn';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { NewTask } from '../../features/tasks/NewTask';
import { useModal } from '../../hooks/useModal';

import { DeleteButton } from '../../UI/DeleteButton';
import { BoardButton } from '../../UI/BoardButton';
import { BasicSuspense } from '../BasicSuspense';

import styles from './Column.module.css';
const Modal = lazy(() => import('../../components/Modal'));

export const Column = ({
  className,
  _id,
  creator,
  name,
  project,
  tasks,
  empty = false,
}) => {
  // example
  const [newOrderTasks, setNewOrderTasks] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const [isShowing, toggle] = useModal();
  const [isShowingEditColumn, toggleEditColumn] = useModal();
  const [isShowingCreateTask, toggleCreateTask] = useModal();
  const [handleDeleteColumn] = useDeleteColumn(_id);
  const { id } = useParams();
  const isCreator = creator === currentUser;

  useEffect(() => {
    setNewOrderTasks(tasks);
  }, [tasks]);

  if (empty) {
    return (
      <>
        <div
          className={classNames(
            styles['t-col'],
            styles['t-col--empty'],
            className || ''
          )}
        >
          <BoardButton
            className={classNames('board-btn', 'btn-reset')}
            onClick={toggle}
            type='button'
          >
            Add Column
          </BoardButton>
        </div>
        <Modal isShowing={isShowing} hide={toggle} title='Create Column'>
          <NewColumn projectId={id} toggle={toggle} />
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className={classNames(styles['t-col'], className || '')}>
        <div className={styles['t-col__top']}>
          <span
            className={styles['t-col__title']}
            onClick={isCreator && toggleEditColumn}
          >
            {name}
          </span>
          {isCreator && (
            <DeleteButton
              className={styles['t-col__delete']}
              onClick={handleDeleteColumn}
            />
          )}
        </div>
        <div className={styles['t-col__content']}>
          <Droppable droppableId={_id}>
            {(provided) => (
              <ul
                className={classNames(styles['t-col__list'], 'list-reset')}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {newOrderTasks
                  .filter((task) => task.currentColumn === _id)
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className={styles['t-col__item']}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task className='task--board' {...task} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className={styles['t-col__bottom']}>
          <BoardButton
            className={styles['t-col__add']}
            type='button'
            onClick={toggleCreateTask}
          >
            Add task
          </BoardButton>
        </div>
      </div>
      <BasicSuspense
        component={
          <Modal
            isShowing={isShowingEditColumn}
            hide={toggleEditColumn}
            title='Edit Column'
          >
            <EditColumn
              toggle={toggleEditColumn}
              columnId={_id}
              name={name}
              project={project}
            />
          </Modal>
        }
      />
      <BasicSuspense
        component={
          <Modal
            isShowing={isShowingCreateTask}
            hide={toggleCreateTask}
            title='Create Task'
          >
            <NewTask projectId={id} columnId={_id} toggle={toggleCreateTask} />
          </Modal>
        }
      />
    </>
  );
};
