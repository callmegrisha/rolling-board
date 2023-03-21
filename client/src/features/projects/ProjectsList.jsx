import { Project } from '../../components/Project';

import { useProjects } from './useProjects';
import { ProjectsLoader } from './ProjectsLoader';
import styles from './ProjectsList.module.css';

export const ProjectsList = ({ search }) => {
  const [projects, projectsLoading] = useProjects();

  const projectsArr = search
    ? projects.filter(
        (project) => project.name.toLowerCase() === search.toLowerCase()
      )
    : projects;

  return (
    <ul className={`${styles.projects__list} list-reset`}>
      {projectsLoading === 'loading'
        ? [...Array(8)].map((_, index) => <ProjectsLoader key={index} />)
        : projectsArr.map((project) => (
            <li className='projects__item' key={project._id}>
              <Project {...project} />
            </li>
          ))}
    </ul>
  );
};
