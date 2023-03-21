import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '../Layout';
import { PageLoader } from '../PageLoader';
import { HomePage } from '../../pages/HomePage';
import { AboutPage } from '../../pages/AboutPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { ProjectsPage } from '../../pages/ProjectsPage';
import { ProjectPage } from '../../pages/ProjectPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { selectIsUserAuthenticated } from '../../features/auth/authSlice';

export const AppRouter = () => {
  const isAuth = useSelector(selectIsUserAuthenticated);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        {isAuth ? (
          <>
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/projects/:id' element={<ProjectPage />} />
          </>
        ) : (
          <Route path='*' element={<PageLoader />} />
        )}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
