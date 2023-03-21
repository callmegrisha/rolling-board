import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, selectAuthInfo } from './authSlice';
import { notify } from '../../utils/notify';

export const useLogin = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(selectAuthInfo);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmitLoginForm = async (data) => {
    const responseResult = await dispatch(loginUser(data));

    error && notify(error);

    // если авторизован, сохранить токен
    if ('token' in responseResult.payload) {
      window.localStorage.setItem('token', responseResult.payload.token);
    }
  };

  return [register, handleSubmit, handleSubmitLoginForm, errors];
};
