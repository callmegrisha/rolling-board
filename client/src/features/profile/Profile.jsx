import { lazy } from 'react';
import { useSelector } from 'react-redux';

import { BasicSuspense } from '../../components/BasicSuspense';
import { Button } from '../../UI/Button';
import { useModal } from '../../hooks/useModal';
import { NewProject } from '../../features/projects/NewProject';
import { selectProfileInfo } from '../../features/profile/profileSlice';
import { EditProfile } from './EditProfile';
import { useUploadAvatar } from './useUploadAvatar';
import styles from './Profile.module.css';

const Modal = lazy(() => import('../../components/Modal'));

export const Profile = () => {
  const [isShowing, toggle] = useModal();
  const [isShowingEdit, toggleEdit] = useModal();

  const { avatar, _id, name } = useSelector(selectProfileInfo);

  const [avatarUrl, inputFileRef, handleChangeAvatar, handleSubmitAvatar] =
    useUploadAvatar();

  return (
    <>
      <div className='user-profile'>
        <div className={styles['user-profile__top']}>
          <div className={styles['user-profile__avatar']}>
            <img
              src={
                avatar
                  ? 'http://localhost:5000' + avatar
                  : `https://ui-avatars.com/api/?name=${name}`
              }
              alt={name}
            />
          </div>
          <div className='user-profile__info'>
            <span className={styles['user-profile__name']}>{name}</span>
            <span className={styles['user-profile__id']}>ID: {_id}</span>
          </div>
        </div>
        <div className='user-profile__nav nav-btn'>
          <Button
            className='user-profile__btn nav-btn__item btn btn--form'
            onClick={toggleEdit}
          >
            edit profile
          </Button>
          {!avatarUrl ? (
            <div
              className={`${styles['upload-file']} user-profile__btn nav-btn__item`}
            >
              <input
                ref={inputFileRef}
                type='file'
                className={styles['upload-file__input']}
                onChange={handleChangeAvatar}
              />
              <Button
                className='nav-btn__item btn btn--form'
                type='button'
                onClick={() => inputFileRef.current.click()}
              >
                change avatar
              </Button>
            </div>
          ) : (
            <div
              className={`${styles['upload-file']} user-profile__btn nav-btn__item`}
            >
              <Button
                className='nav-btn__item btn btn--form'
                type='button'
                onClick={handleSubmitAvatar}
              >
                save avatar
              </Button>
            </div>
          )}
          <Button
            className='user-profile__btn nav-btn__item btn btn--form'
            type='button'
            onClick={toggle}
          >
            create project
          </Button>
        </div>
      </div>
      <BasicSuspense
        component={
          <Modal isShowing={isShowing} hide={toggle} title='Create Project'>
            <NewProject toggle={toggle} />
          </Modal>
        }
      />
      <BasicSuspense
        component={
          <Modal
            isShowing={isShowingEdit}
            hide={toggleEdit}
            title='Edit Profile'
          >
            <EditProfile toggleEdit={toggleEdit} />
          </Modal>
        }
      />
    </>
  );
};
