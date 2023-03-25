import classNames from 'classnames';
import { useState, lazy } from 'react';
import { useSelector } from 'react-redux';

import { DeleteButton } from '../../UI/DeleteButton';
import { EditTask } from '../../features/tasks/EditTask';
import { useModal } from '../../hooks/useModal';
import { useDeleteTask } from '../../features/tasks/useDeleteTask';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { BasicSuspense } from '../BasicSuspense';
import styles from './Task.module.css';

const Modal = lazy(() => import('../Modal'));

export const Task = ({ className, ...task }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [taskInfo, setTaskInfo] = useState({});
  const [isShowingEditTask, toggleEditTask] = useModal();
  const [handleDeleteTask] = useDeleteTask(task._id);
  const assignedUserOrCreator =
    task.creator === currentUser || task.assignedTo === currentUser;

  const handleEditForm = (data) => {
    setTaskInfo(data);
    toggleEditTask();
  };

  return (
    <>
      <div className={classNames(styles.task, styles[className] || '')}>
        <div
          className={styles.task__content}
          onClick={() => handleEditForm({ ...task })}
        >
          <span className={styles.task__title}>{task.name}</span>
          {task.description && (
            <span className={styles.task__description}>{task.description}</span>
          )}
        </div>
        {assignedUserOrCreator && (
          <DeleteButton
            className={styles.task__delete}
            onClick={handleDeleteTask}
          />
        )}
      </div>
      <BasicSuspense
        component={
          <Modal
            isShowing={isShowingEditTask}
            hide={toggleEditTask}
            title='Edit Task'
          >
            <EditTask taskInfo={taskInfo} toggle={toggleEditTask} />
          </Modal>
        }
      />
    </>
  );
};
