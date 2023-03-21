import { Container } from '../../components/Container';
import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <section className={styles['about-project']}>
      <Container className={styles['about-project__container']}>
        <h1 className={`${styles['about-project__title']} page-title`}>
          About Project
        </h1>
        <ul className='about-project__list list-reset'>
          <li className={styles['about-project__item']}>
            <article className={styles['team-member']}>
              <h2 className={styles['team-member__name']}>Hryhorii Petrov</h2>
              <ul className={`${styles['team-member__skills']} list-reset`}>
                <li
                  className={`${styles['team-member__skill']} ${styles['team-member__skill--design']}`}
                >
                  HTML/CSS
                </li>
                <li
                  className={`${styles['team-member__skill']} ${styles['team-member__skill--api']}`}
                >
                  NodeJS/Express
                </li>
                <li
                  className={`${styles['team-member__skill']} ${styles['team-member__skill--features']}`}
                >
                  ReactJS
                </li>
                <li
                  className={`${styles['team-member__skill']} ${styles['team-member__skill--design']}`}
                >
                  Redux Toolkit
                </li>
              </ul>
              <p className='team-member__description'>
                Made layout, API with Express, frontend with ReactJS
              </p>
            </article>
          </li>
          <li className={styles['about-project__item']}>
            <article className={styles['team-member']}>
              <h2 className={styles['team-member__name']}>Viachas Kul</h2>
              <ul className={`${styles['team-member__skills']} list-reset`}>
                <li
                  className={`${styles['team-member__skill']} ${styles['team-member__skill--design']}`}
                >
                  UX/UI Design
                </li>
              </ul>
              <p className='team-member__description'>
                Made design in Figma <br />
                LinkedIn Link:{' '}
                <a href='https://www.linkedin.com/in/kubic/'>LinkedIn</a>
              </p>
            </article>
          </li>
        </ul>
      </Container>
    </section>
  );
};
