import { lazy } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BasicSuspense } from '../BasicSuspense';
import {
  selectIsUserAuthenticated,
  logout,
} from '../../features/auth/authSlice';
import { Container } from '../Container';
import logoSvg from '../../images/logo.svg';

import styles from './Header.module.css';
const AuthNav = lazy(() => import('./components/AuthNav'));
const NotAuthNav = lazy(() => import('./components/NotAuthNav'));

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
            <BasicSuspense
              component={
                <AuthNav
                  handleUserSidebar={handleUserSidebar}
                  onClickLogout={onClickLogout}
                />
              }
            />
          ) : (
            <BasicSuspense component={<NotAuthNav />} />
          )}
          <button
            className={`${styles.header__burger} burger-btn ${
              mobileMenu && 'burger-btn--active'
            }`}
            type='button'
            aria-label='Button for toggle mobile menu'
            onClick={handleMobileMenu}
          >
            <span />
          </button>
        </Container>
      </header>
    </>
  );
};
