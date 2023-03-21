import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Container } from '../../components/Container';
import { InfoBlock } from '../../components/InfoBlock';
import { selectIsUserAuthenticated } from '../../features/auth/authSlice';
import { RegisterForm } from '../../features/auth/RegisterForm';

export const RegisterPage = () => {
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
          <RegisterForm />
        </Container>
      </section>
    </>
  );
};
