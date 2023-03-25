import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Accordion } from '../Accordion';
import { DeleteButton } from '../../UI/DeleteButton';
import { Profile } from '../../features/profile/Profile';
import { selectProjects } from '../../features/projects/projectsSlice';
import {
  loadTasksByCurrentUser,
  selectAllTasksByCurrentUser,
} from '../../features/tasks/tasksSlice';

import styles from './UserSidebar.module.css';

export const UserSidebar = ({ handleUserSidebar }) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const tasks = useSelector(selectAllTasksByCurrentUser);

  useEffect(() => {
    dispatch(loadTasksByCurrentUser());
  }, [dispatch]);

  return (
    <div className={styles['user-sidebar']}>
      <DeleteButton
        className='close-btn'
        onClick={() => handleUserSidebar(false)}
      />
      <div className='user-sidebar__wrapper'>
        <div className={styles['user-sidebar__header']}></div>
        <div className={styles['user-sidebar__inner']}>
          <div className={styles['user-sidebar__profile']}>
            <Profile />
          </div>
          <div className='user-sidebar__tasks'>
            <span className={styles['user-sidebar__title']}>your tasks</span>
            {tasks.length !== 0 ? (
              <>
                <input
                  className={`${styles['user-sidebar__search']} input input--search`}
                  type='text'
                  placeholder='Search Task...'
                />
                <ul className='user-sidebar__list list-reset'>
                  {projects.map((project) => (
                    <li className='user-sidebar__item' key={project._id}>
                      <Accordion projectId={project._id} title={project.name} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span className={styles['user-sidebar__msg']}>
                You have no assigned tasks
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
