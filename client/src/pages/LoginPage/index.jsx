import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { Container } from '../../components/Container';
import { InfoBlock } from '../../components/InfoBlock';
import { selectIsUserAuthenticated } from '../../features/auth/authSlice';
import { LoginForm } from '../../features/auth/LoginForm';

export const LoginPage = () => {
  const isAuth = useSelector(selectIsUserAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    isAuth && navigate('/projects');
  }, [isAuth, navigate]);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <section className='auth'>
        <Container className='auth__container'>
          <InfoBlock
            subtitle='Project Management App'
            title='Everything you need in one place'
            description='Manage your boards using Drag-n-Drop, create adittional boards and
            tasks.'
          />
          <LoginForm />
        </Container>
      </section>
    </>
  );
};
