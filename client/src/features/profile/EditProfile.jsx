import classNames from 'classnames';

import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Label } from '../../UI/Label';
import { Notify } from '../../UI/Notify';
import { useEditProfile } from './useEditProfile';

export const EditProfile = ({ toggleEdit }) => {
  const [register, handleSubmit, handleSubmitProfileForm, errors] =
    useEditProfile(toggleEdit);

  return (
    <form className='form' onSubmit={handleSubmit(handleSubmitProfileForm)}>
      <Label className='form__item' title='Name'>
        <Input
          className='input'
          type='text'
          placeholder='Name'
          label='name'
          validation={{ required: 'Name is required' }}
          register={register}
        />
        {errors.name?.type === 'required' && (
          <Notify message={errors.name?.message} />
        )}
      </Label>
      <Label className='form__item' title='Login'>
        <Input
          className='input'
          type='text'
          placeholder='Login'
          label='login'
          validation={{ required: 'Login is required' }}
          register={register}
        />
        {errors.login?.type === 'required' && (
          <Notify message={errors.login?.message} />
        )}
      </Label>
      <Label className='form__item' title='Email'>
        <Input
          className='input'
          type='email'
          placeholder='Email'
          label='email'
          validation={{ required: 'Email is required' }}
          register={register}
        />
        {errors.email?.type === 'required' && (
          <Notify message={errors.email?.message} />
        )}
      </Label>
      <div className={classNames('form__nav', 'nav-btn')}>
        <Button
          className={classNames('nav-btn__item', 'btn', 'btn--form')}
          type='submit'
        >
          Save
        </Button>
      </div>
    </form>
  );
};
