import { Link } from 'react-router-dom';

import { Container } from '../Container';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container className={styles.hero__container}>
        <span className={styles.hero__subtitle}>Project Management App</span>
        <h1 className={`${styles.hero__title} main-title`}>
          Colaborate and build faster, together.
        </h1>
        <p className={styles.hero__description}>
          Create, share, and get feedback with collaborative
          <br />
          boards for rapid development.
        </p>
        <Link className='btn btn--filled' to='/login'>
          Create Kanban Board
        </Link>
      </Container>
    </section>
  );
};
