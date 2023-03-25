import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTasksByCurrentUser } from '../../features/tasks/tasksSlice';
import { Task } from '../Task';
import styles from './Accordion.module.css';

export const Accordion = ({ projectId, title = 'unknown' }) => {
  const [isActive, setIsActive] = useState(false);
  const tasks = useSelector(selectAllTasksByCurrentUser);

  return (
    <div
      className={`${styles.accordion} ${
        isActive && styles['accordion--active']
      }`}
    >
      <button
        className={styles.accordion__header}
        type='button'
        onClick={() => setIsActive(!isActive)}
      >
        {title}
      </button>
      {isActive && (
        <>
          {tasks
            .filter((task) => task !== projectId)
            .map((task) => (
              <div className={styles.accordion__item} key={task._id}>
                <Task name={task.name} description={task.description} />
              </div>
            ))}
        </>
      )}
    </div>
  );
};
