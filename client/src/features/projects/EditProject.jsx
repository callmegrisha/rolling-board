import { Button } from '../../UI/Button';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { MultipleSelect } from '../../UI/MultipleSelect';
import { useEditProject } from './useEditProject';
import { Notify } from '../../UI/Notify';

export const EditProject = ({ projectInfo }) => {
  const [
    register,
    handleSubmit,
    handleSubmitProjectForm,
    users,
    control,
    errors,
  ] = useEditProject(projectInfo);

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
          register={register}
          validation={{ required: 'Description is required' }}
          {...register('description')}
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
          Save
        </Button>
      </div>
    </form>
  );
};
