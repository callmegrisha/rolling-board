import { lazy, useState } from 'react';
import { Link } from 'react-router-dom';

import { BasicSuspense } from '../BasicSuspense';
import { Button } from '../../UI/Button';
import { EditProject } from '../../features/projects/EditProject';
import { useModal } from '../../hooks/useModal';
import { useDeleteProject } from '../../features/projects/useDeleteProject';

import styles from './Project.module.css';
const Modal = lazy(() => import('../Modal'));

export const Project = ({ _id, name, description, team }) => {
  const [projectInfo, setProjectInfo] = useState({});
  const [isShowing, toggle] = useModal();
  const [handleDeleteProject] = useDeleteProject(_id);

  const handleEditForm = (id, name, description, team) => {
    const data = {
      id,
      name,
      description,
      team,
    };
    setProjectInfo(data);
    toggle();
  };

  return (
    <>
      <article className={styles.project}>
        <h2 className={styles.project__name}>{name}</h2>
        <p className={styles.project__description}>{description}</p>
        <nav className={styles.project__nav}>
          <Link
            className={`${styles.project__btn} btn btn--form`}
            to={`/projects/${_id}`}
          >
            open board
          </Link>
          <Button
            className={`${styles.project__btn} btn btn--form`}
            type='button'
            onClick={() => handleEditForm(_id, name, description, team)}
          >
            edit
          </Button>
          <Button
            className={`${styles.project__btn} btn btn--form`}
            type='button'
            onClick={handleDeleteProject}
          >
            delete
          </Button>
        </nav>
      </article>
      <BasicSuspense
        component={
          <Modal isShowing={isShowing} hide={toggle} title='Edit Project'>
            <EditProject projectInfo={projectInfo} />
          </Modal>
        }
      />
    </>
  );
};
