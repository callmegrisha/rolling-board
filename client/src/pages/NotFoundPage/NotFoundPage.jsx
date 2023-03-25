import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

const NotFoundPage = () => {
  return (
    <>
      <section className={styles['not-found']}>
        <div className={styles['not-found__inner']}>
          <h1 className={`${styles['not-found__title']} main-title`}>
            Sorry! Page not found
          </h1>
          <p className={styles['not-found__description']}>
            Head homepage or use the search to find what you're looking for.
          </p>
          <Link
            className={`${styles['not-found__link']} btn btn--filled`}
            to='/'
          >
            Back to Homepage
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
