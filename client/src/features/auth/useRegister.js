import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../utils/notify';

import { registerUser, selectAuthInfo } from './authSlice';

export const useRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      login: '',
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const { error } = useSelector(selectAuthInfo);

  const handleSubmitRegisterForm = async (data) => {
    const responseResult = await dispatch(registerUser(data));

    error && notify(error);

    if ('token' in responseResult.payload) {
      window.localStorage.setItem('token', responseResult.payload.token);
    }
  };

  return [register, handleSubmit, handleSubmitRegisterForm, errors];
};
