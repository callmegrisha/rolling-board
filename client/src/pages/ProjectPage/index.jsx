import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../../components/Container';
import { ProjectInfoLoader } from './ProjectInfoLoader';
import {
  loadProject,
  selectProjectsLoading,
} from '../../features/projects/projectsSlice';
import { ColumnsList } from '../../features/columns/ColumnsList';

import styles from './ProjectPage.module.css';

export const ProjectPage = () => {
  const projectInfoLoading = useSelector(selectProjectsLoading);
  const [projectInfo, setProjectInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadProject(id)).then((action) =>
      setProjectInfo(action.payload.data.project)
    );
  }, [dispatch, id]);

  return (
    <>
      <section className={styles.board}>
        <Container className={styles.board__container}>
          {projectInfoLoading === 'loading' ? (
            <ProjectInfoLoader />
          ) : (
            <div className={styles.board__info}>
              <h1
                className={`${styles.board__title} page-title`}
                onClick={() => navigate(-1)}
              >
                {projectInfo.name || 'Unknown Project'}
              </h1>
              <p className={styles.board__description}>
                {projectInfo.description || 'Unknown'}
              </p>
            </div>
          )}
          <ColumnsList projectId={id} projectCreator={projectInfo.creator} />
        </Container>
      </section>
    </>
  );
};
