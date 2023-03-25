import rollingBoardLogotype from '../../images/rolling-board-logo.svg';

import styles from './PageLoader.module.css';

export const PageLoader = () => {
  return (
    <section className={styles['page-preloader']}>
      <img src={rollingBoardLogotype} alt='Rolling Board Logotype' />
    </section>
  );
};
