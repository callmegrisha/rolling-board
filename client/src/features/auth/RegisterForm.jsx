import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Button } from '../../UI/Button';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { FormWrap } from '../../components/FormWrap';
import { Notify } from '../../UI/Notify';
import { useRegister } from './useRegister';

export const RegisterForm = () => {
  const [register, handleSubmit, handleSubmitRegisterForm, errors] =
    useRegister();

  return (
    <FormWrap className={classNames('auth__form')} title='Sign up'>
      <form
        className={classNames('form')}
        onSubmit={handleSubmit(handleSubmitRegisterForm)}
      >
        <Label className={classNames('form__item', 'label')} title='Name'>
          <Input
            className={classNames('input')}
            type='text'
            placeholder='Name'
            label='name'
            validation={{ required: 'Put your name please', minLength: 3 }}
            register={register}
          />
          {errors.name?.type === 'required' && (
            <Notify message={errors.name?.message} />
          )}
        </Label>
        <Label className={classNames('form__item', 'label')} title='Login'>
          <Input
            className={classNames('input')}
            type='text'
            placeholder='Login'
            label='login'
            validation={{ required: 'Login is required', minLength: 5 }}
            register={register}
          />
          {errors.login?.type === 'required' && (
            <Notify message={errors.login?.message} />
          )}
        </Label>
        <Label className={classNames('form__item', 'label')} title='Email'>
          <Input
            className={classNames('input')}
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
        <Label className={classNames('form__item', 'label')} title='Password'>
          <Input
            className={classNames('input')}
            type='password'
            placeholder='Password'
            label='password'
            validation={{ required: 'Password is required' }}
            register={register}
          />
          {errors.password?.type === 'required' && (
            <Notify message={errors.password?.message} />
          )}
        </Label>
        <p className={classNames('form__sign')}>
          Already have an account? <Link to='/login'>Sign in</Link>
        </p>
        <Button
          className={classNames('form__btn', 'btn', 'btn--form')}
          type='submit'
        >
          Create an Account
        </Button>
      </form>
    </FormWrap>
  );
};
