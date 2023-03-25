import { Link } from 'react-router-dom';
import styles from '../Header.module.css';

export const NotAuthNav = () => {
  return (
    <>
      <nav className={`${styles.header__nav}`}>
        <ul className={`${styles.nav__list} list-reset`}>
          <li className={styles.nav__item}>
            <Link className={styles.nav__link} to='/about' title='About'>
              about
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`${styles['header__sign-up']} sign-up`}>
        <Link className={styles['sign-up__link']} to='/login' title='Login'>
          Login
        </Link>
        <Link
          className={`${styles['sign-up__link']} btn btn--bordered`}
          to='/register'
          title='Sign up'
        >
          Sign up
        </Link>
      </div>
    </>
  );
};
