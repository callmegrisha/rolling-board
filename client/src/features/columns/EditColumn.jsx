import { Button } from '../../UI/Button';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { useEditColumn } from './useEditColumn';
import { Notify } from '../../UI/Notify';

export const EditColumn = ({ columnId, toggle, name, project }) => {
  const [register, handleSubmit, handleSubmitEditColumn, errors] =
    useEditColumn(columnId, toggle, name, project);

  return (
    <form className='form' onSubmit={handleSubmit(handleSubmitEditColumn)}>
      <Label className='label form__item' title='Name'>
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
      <div className='form__nav nav-btn'>
        <Button className='nav-btn__item btn btn--form' type='submit'>
          Save
        </Button>
      </div>
    </form>
  );
};
