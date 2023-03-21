import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfileInfo, updateProfile } from './profileSlice';

export const useEditProfile = (toggleEdit) => {
  const profileInfo = useSelector(selectProfileInfo);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profileInfo.name,
      login: profileInfo.login,
      email: profileInfo.email,
    },
  });

  const handleSubmitProfileForm = (data) => {
    dispatch(updateProfile(data));
    toggleEdit();
  };

  return [register, handleSubmit, handleSubmitProfileForm, errors];
};
