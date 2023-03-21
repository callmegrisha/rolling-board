import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Label } from '../../UI/Label';
import { MultipleSelect } from '../../UI/MultipleSelect';
import { Notify } from '../../UI/Notify';
import { useNewTask } from './useNewTask';

export const NewTask = ({ projectId, columnId, toggle }) => {
  const [register, handleSubmit, handleSubmitTaskForm, users, control, errors] =
    useNewTask({
      projectId,
      columnId,
      toggle,
    });

  return (
    <form className='form' onSubmit={handleSubmit(handleSubmitTaskForm)}>
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
      <Label className='form__item' title='Description'>
        <Input
          className='input'
          placeholder='Description'
          label='description'
          validation={{ required: 'Description is required' }}
          register={register}
        />
        {errors.description?.type === 'required' && (
          <Notify message={errors.description?.message} />
        )}
      </Label>
      <Label className='form__item' title='Assigned To'>
        <MultipleSelect
          control={control}
          options={users}
          getOptionLabel={(user) => user.name}
          getOptionValue={(user) => user._id}
          label='assignedTo'
        />
        {errors.assignedTo?.type === 'required' && (
          <Notify message={errors.assignedTo?.message} />
        )}
      </Label>
      <div className='form__nav nav-btn'>
        <Button className='nav-btn__item btn btn--form' type='submit'>
          Create
        </Button>
      </div>
    </form>
  );
};
