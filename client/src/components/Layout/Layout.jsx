import { useState, useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { loadCurrentUser } from '../../features/auth/authSlice';
import { loadProfileInfo } from '../../features/profile/profileSlice';
import { BasicSuspense } from '../BasicSuspense';
const MobileMenu = lazy(() => import('../MobileMenu'));
const UserSidebar = lazy(() => import('../UserSidebar'));

export const Layout = () => {
  const [userSidebar, setUserSidebar] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(loadCurrentUser());
      dispatch(loadProfileInfo());
    }
  }, [dispatch, token]);

  const handleUserSidebar = (state = false) => {
    setUserSidebar(state);
  };

  const handleMobileMenu = () => {
    setMobileMenu((prevState) => !prevState);
  };

  return (
    <>
      <Header
        handleUserSidebar={handleUserSidebar}
        handleMobileMenu={handleMobileMenu}
        mobileMenu={mobileMenu}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
      {mobileMenu && (
        <BasicSuspense
          component={<MobileMenu handleMobileMenu={handleMobileMenu} />}
        />
      )}
      {userSidebar && (
        <BasicSuspense
          component={<UserSidebar handleUserSidebar={handleUserSidebar} />}
        />
      )}
    </>
  );
};
