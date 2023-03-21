import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile, uploadAvatar } from './profileSlice';

export const useUploadAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);

  const handleChangeAvatar = async (event) => {
    try {
      const formData = new FormData();
      const avatar = event.target.files[0];
      formData.append('image', avatar);
      const data = await dispatch(uploadAvatar(formData));
      setAvatarUrl(data.payload.url);
    } catch (error) {
      alert('Upload error!');
    }
  };

  const handleSubmitAvatar = () => {
    const userData = {
      avatar: avatarUrl,
    };
    dispatch(updateProfile(userData));
  };

  return [avatarUrl, inputFileRef, handleChangeAvatar, handleSubmitAvatar];
};
