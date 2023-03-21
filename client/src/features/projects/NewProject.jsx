import { Button } from '../../UI/Button';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { useNewProject } from './useNewProject';
import { MultipleSelect } from '../../UI/MultipleSelect';
import { Notify } from '../../UI/Notify';

export const NewProject = ({ toggle }) => {
  const [
    register,
    handleSubmit,
    handleSubmitProjectForm,
    users,
    control,
    errors,
  ] = useNewProject({
    toggle,
  });

  return (
    <form className='form' onSubmit={handleSubmit(handleSubmitProjectForm)}>
      <Label className='form__item' title='Name'>
        <Input
          className='input'
          type='text'
          placeholder='Name'
          label='name'
          validation={{ required: 'Project name is required' }}
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
      <Label className='form__item' title='Select team members'>
        <MultipleSelect
          control={control}
          options={users}
          getOptionLabel={(user) => user.name}
          getOptionValue={(user) => user._id}
          label='team'
        />
        {errors.team?.type === 'required' && (
          <Notify message={errors.team?.message} />
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
