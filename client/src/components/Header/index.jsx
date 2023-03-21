import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  selectIsUserAuthenticated,
  logout,
} from '../../features/auth/authSlice';
import { Container } from '../Container';
import logoSvg from '../../images/logo.svg';

import styles from './Header.module.css';

export const Header = ({ handleUserSidebar, handleMobileMenu, mobileMenu }) => {
  const isAuth = useSelector(selectIsUserAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <header className={styles.header}>
        <Container className={styles.header__container}>
          <Link className='logo' to='/' title='Link to homepage'>
            <img src={logoSvg} alt='Rolling Board Logotype' />
          </Link>
          {isAuth ? (
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
              <div
                className={`${styles['sign-up']} ${styles['header__sign-up']}`}
              >
                <button
                  className={`${styles['sign-up__link']} btn-reset`}
                  type='button'
                  onClick={onClickLogout}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <nav className={`${styles.header__nav}`}>
                <ul className={`${styles.nav__list} list-reset`}>
                  <li className={styles.nav__item}>
                    <Link
                      className={styles.nav__link}
                      to='/about'
                      title='About'
                    >
                      about
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className={`${styles['header__sign-up']} sign-up`}>
                <Link
                  className={styles['sign-up__link']}
                  to='/login'
                  title='Login'
                >
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
          )}

          <button
            className={`${styles.header__burger} burger-btn ${
              mobileMenu && 'burger-btn--active'
            }`}
            type='button'
            aria-label='Button for toggle mobile menu'
            onClick={handleMobileMenu}
          >
            <span></span>
          </button>
        </Container>
      </header>
    </>
  );
};
