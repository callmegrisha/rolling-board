import classNames from 'classnames';

import { Button } from '../../UI/Button';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { Notify } from '../../UI/Notify';
import { useNewColumn } from './useNewColumn';

export const NewColumn = ({ projectId, toggle }) => {
  const [register, handleSubmit, handleSubmitNewColumn, errors] = useNewColumn(
    projectId,
    toggle
  );

  return (
    <form className='form' onSubmit={handleSubmit(handleSubmitNewColumn)}>
      <Label className={classNames('label', 'form__item')} title='Name'>
        <Input
          className='input'
          type='text'
          placeholder='Name'
          label='name'
          validation={{ required: 'Column name is required' }}
          register={register}
        />
        {errors.name?.type === 'required' && (
          <Notify message={errors.name?.message} />
        )}
      </Label>
      <div className={classNames('form__nav', 'nav-btn')}>
        <Button
          className={classNames('nav-btn__item', 'btn', 'btn--form')}
          type='submit'
        >
          Create
        </Button>
      </div>
    </form>
  );
};
