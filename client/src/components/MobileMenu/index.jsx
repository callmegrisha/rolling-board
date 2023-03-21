import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteButton } from '../../UI/DeleteButton';
import { Button } from '../../UI/Button';
import {
  logout,
  selectIsUserAuthenticated,
} from '../../features/auth/authSlice';
import logo from '../../images/logo-second.svg';

import styles from './MobileMenu.module.css';

export const MobileMenu = ({ handleMobileMenu }) => {
  const isAuth = useSelector(selectIsUserAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className={styles.menu}>
      <div className='menu__inner'>
        <div className={styles.menu__top}>
          <Link className='menu__logo' to='/'>
            <img src={logo} alt='Rolling board logotype icon' />
          </Link>
          <DeleteButton
            className='menu__close'
            aria-label='Button for close menu'
            onClick={() => handleMobileMenu(false)}
          />
        </div>
        <nav className='menu__nav'>
          <ul className={`${styles.menu__list} list-reset`}>
            {isAuth ? (
              <>
                <li className={styles.menu__item}>
                  <Link className={styles.menu__link} to='/projects'>
                    Projects
                  </Link>
                </li>
                <li className={styles.menu__item}>
                  <Link className={styles.menu__link} to='/about'>
                    About
                  </Link>
                </li>
              </>
            ) : (
              <li className={styles.menu__item}>
                <Link className={styles.menu__link} to='/about'>
                  About
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className={styles.menu__sign}>
          {isAuth ? (
            <Button
              className={`${styles.menu__btn} btn btn--form`}
              title='Link to sign up page'
              onClick={onClickLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                className={`${styles.menu__btn} btn btn--form`}
                to='/login'
                title='Link to login page'
              >
                Login
              </Link>
              <Link
                className={`${styles.menu__btn} btn btn--form`}
                to='/register'
                title='Link to sign up page'
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
