import { Container } from '../../components/Container';
import { OpportunityCard } from '../../components/OpportunityCard';
import { InfoBlock } from '../../components/InfoBlock';
import { Hero } from '../../components/Hero';

import advantageSvgFirst from '../../images/advantage-1.svg';
import advantageSvgSecond from '../../images/advantage-2.svg';
import advantageSvgThird from '../../images/advantage-3.svg';

import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <section className={styles.opportunities}>
        <Container className={styles.opportunities__container}>
          <ul className={`${styles.opportunities__list} list-reset`}>
            <li className={styles.opportunities__item}>
              <OpportunityCard
                className='opportunity--integrate'
                title='Integrate'
                description='The ability to quickly set up and customize workflows for just
              about anything.'
              />
            </li>
            <li className={styles.opportunities__item}>
              <OpportunityCard
                className='opportunity--colaborate'
                title='Colaborate'
                description='Manage projects, organize tasks, and build team spirit—all in
                one place.'
              />
            </li>
            <li className={styles.opportunities__item}>
              <OpportunityCard
                className='opportunity--succeed'
                title='Succeed'
                description='Every single part of your task can be managed, tracked, and
                shared with teammates.'
              />
            </li>
          </ul>
        </Container>
      </section>
      <section className={styles.advantages}>
        <Container className={styles.advantages__container}>
          <div className={`${styles.advantages__item} ${styles.advantage}`}>
            <InfoBlock
              className={styles.advantage__content}
              subtitle='Universal'
              title='Build the workflow you want'
              description='Manage your boards using Drag-n-Drop, create adittional boards
                and tasks.'
            />
            <div className={styles.advantage__img}>
              <img src={advantageSvgFirst} alt='Build the workflow you want' />
            </div>
          </div>
          <div
            className={`${styles.advantages__item} ${styles.advantage} ${styles.left}`}
          >
            <InfoBlock
              className={styles.advantage__content}
              subtitle='Optimized'
              title='Everything you need in one place'
              description='You can specify additional info in task description and assign
              users.'
            />
            <div className={styles.advantage__img}>
              <img
                src={advantageSvgSecond}
                alt='Everything you need in one place'
              />
            </div>
          </div>
          <div className={`${styles.advantages__item} ${styles.advantage}`}>
            <InfoBlock
              className={styles.advantage__content}
              subtitle='Unlimited'
              title='No limits for all users.'
              description='Unlimited kanban boards, columns and tasks.'
            />
            <div className={styles.advantage__img}>
              <img src={advantageSvgThird} alt='No limits for all users.' />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
