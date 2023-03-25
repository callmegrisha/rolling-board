import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BasicSuspense } from '../BasicSuspense';
import { Layout } from '../Layout';
import { PageLoader } from '../PageLoader';
import { selectIsUserAuthenticated } from '../../features/auth/authSlice';
const HomePage = lazy(() => import('../../pages/HomePage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const AboutPage = lazy(() => import('../../pages/AboutPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const ProjectsPage = lazy(() => import('../../pages/ProjectsPage'));
const ProjectPage = lazy(() => import('../../pages/ProjectPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

export const AppRouter = () => {
  const isAuth = useSelector(selectIsUserAuthenticated);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <BasicSuspense fallback={<PageLoader />} component={<HomePage />} />
          }
        />
        <Route
          path='/about'
          element={
            <BasicSuspense
              fallback={<PageLoader />}
              component={<AboutPage />}
            />
          }
        />
        <Route
          path='/login'
          element={
            <BasicSuspense
              fallback={<PageLoader />}
              component={<LoginPage />}
            />
          }
        />
        <Route
          path='/register'
          element={
            <BasicSuspense
              fallback={<PageLoader />}
              component={<RegisterPage />}
            />
          }
        />
        {isAuth && (
          <>
            <Route
              path='/projects'
              element={
                <BasicSuspense
                  fallback={<PageLoader />}
                  component={<ProjectsPage />}
                />
              }
            />
            <Route
              path='/projects/:id'
              element={
                <BasicSuspense
                  fallback={<PageLoader />}
                  component={<ProjectPage />}
                />
              }
            />
          </>
        )}
        <Route
          path='*'
          element={
            <BasicSuspense
              fallback={<PageLoader />}
              component={<NotFoundPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
};
