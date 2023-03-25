import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { UserSidebar } from '../UserSidebar';
import { MobileMenu } from '../MobileMenu';
import { loadCurrentUser } from '../../features/auth/authSlice';
import { loadProfileInfo } from '../../features/profile/profileSlice';

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
      {mobileMenu && <MobileMenu handleMobileMenu={handleMobileMenu} />}
      {userSidebar && <UserSidebar handleUserSidebar={handleUserSidebar} />}
    </>
  );
};
