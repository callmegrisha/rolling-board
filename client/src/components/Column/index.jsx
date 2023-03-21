import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Modal } from '../../components/Modal';
import { Task } from '../Task';
import { NewColumn } from '../../features/columns/NewColumn';
import { EditColumn } from '../../features/columns/EditColumn';
import { NewTask } from '../../features/tasks/NewTask';

import { BoardButton } from '../../UI/BoardButton';
import { useModal } from '../../hooks/useModal';
import { useDeleteColumn } from '../../features/columns/useDeleteColumn';
import { selectCurrentUser } from '../../features/auth/authSlice';

import styles from './Column.module.css';
import { DeleteButton } from '../../UI/DeleteButton';

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
          className={`${styles['t-col']} ${styles['t-col--empty']} ${
            className && className
          }`}
        >
          <BoardButton
            className='board-btn btn-reset'
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
      <div className={`${styles['t-col']} ${className && className}`}>
        <div className={styles['t-col__top']}>
          <span
            className={styles['t-col__title']}
            onClick={isCreator && toggleEditColumn}
          >
            {name}
          </span>
          {isCreator && (
            <DeleteButton
              className={`${styles['t-col__delete']}`}
              onClick={handleDeleteColumn}
            />
          )}
        </div>
        <div className={styles['t-col__content']}>
          <Droppable droppableId={_id}>
            {(provided) => (
              <ul
                className={`${styles['t-col__list']} list-reset`}
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
            className={[styles['t-col__add']]}
            type='button'
            onClick={toggleCreateTask}
          >
            Add task
          </BoardButton>
        </div>
      </div>
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
      <Modal
        isShowing={isShowingCreateTask}
        hide={toggleCreateTask}
        title='Create Task'
      >
        <NewTask projectId={id} columnId={_id} toggle={toggleCreateTask} />
      </Modal>
    </>
  );
};
