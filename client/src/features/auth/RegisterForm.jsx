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
    <FormWrap className='auth__form' title='Sign up'>
      <form className='form' onSubmit={handleSubmit(handleSubmitRegisterForm)}>
        <Label className='label form__item' title='Name'>
          <Input
            className='input'
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
        <Label className='label form__item' title='Login'>
          <Input
            className='input'
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
        <Label className='label form__item' title='Email'>
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
        <Label className='label form__item' title='Password'>
          <Input
            className='input'
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
        <p className='form__sign'>
          Already have an account? <Link to='/login'>Sign in</Link>
        </p>
        <Button className='form__btn btn btn--form' type='submit'>
          Create an Account
        </Button>
      </form>
    </FormWrap>
  );
};
