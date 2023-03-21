import { Link } from 'react-router-dom';

import { Button } from '../../UI/Button';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { FormWrap } from '../../components/FormWrap';
import { Notify } from '../../UI/Notify';
import { useLogin } from './useLogin';

export const LoginForm = () => {
  const [register, handleSubmit, handleSubmitLoginForm, errors] = useLogin();

  return (
    <FormWrap className='auth__form' title='Log in to your account'>
      <form className='form' onSubmit={handleSubmit(handleSubmitLoginForm)}>
        <Label className='label form__item' title='Login'>
          <Input
            className='input'
            type='text'
            placeholder='Login'
            label='login'
            validation={{ required: 'Username is required', minLength: 3 }}
            register={register}
          />
          {errors.login?.type === 'required' && (
            <Notify message={errors.login?.message} />
          )}
        </Label>
        <Label className='label form__item' title='Password'>
          <Input
            className='input'
            type='password'
            placeholder='Password'
            label='password'
            validation={{ required: 'Password is required', minLength: 6 }}
            register={register}
          />
          {errors.password?.type === 'required' && (
            <Notify message={errors.password?.message} />
          )}
        </Label>
        <p className='form__sign'>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
        <Button className='form__btn btn btn--form' type='submit'>
          Login
        </Button>
      </form>
    </FormWrap>
  );
};
