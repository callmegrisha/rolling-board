import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { selectProjects } from '../../features/projects/projectsSlice';
import { ProjectsList } from '../../features/projects/ProjectsList';
import { Container } from '../../components/Container';
import styles from './ProjectsPage.module.css';

export const ProjectsPage = () => {
  const [search, setSearch] = useState('');
  const projects = useSelector(selectProjects);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <section className={styles.projects}>
        <Container className={styles.projects__container}>
          <div className={styles.projects__top}>
            <h1 className={`${styles.projects__title} page-title`}>
              Projects({projects.length})
            </h1>
            <input
              className={`${styles.projects__search} input input--search`}
              type='text'
              value={search}
              placeholder='Search Board...'
              onChange={handleSearch}
            />
          </div>
          <ProjectsList search={search} />
        </Container>
      </section>
    </>
  );
};
