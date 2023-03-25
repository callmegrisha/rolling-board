import { Link } from 'react-router-dom';
import styles from '../Header.module.css';

const AuthNav = ({ handleUserSidebar, onClickLogout }) => {
  return (
    <>
      <nav className={`${styles.header__nav}`}>
        <ul className={`${styles.nav__list} list-reset`}>
          <li className={styles.nav__item}>
            <Link className={styles.nav__link} to='/projects'>
              projects
            </Link>
          </li>
          <li className={styles.nav__item}>
            <button
              type='button'
              className={`${styles.nav__link} btn-reset`}
              onClick={() => handleUserSidebar(true)}
            >
              profile
            </button>
          </li>
          <li className={styles.nav__item}>
            <Link className={styles.nav__link} to='/about'>
              about
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`${styles['sign-up']} ${styles['header__sign-up']}`}>
        <button
          className={`${styles['sign-up__link']} btn-reset`}
          type='button'
          onClick={onClickLogout}
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default AuthNav;
