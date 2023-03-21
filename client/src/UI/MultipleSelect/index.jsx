import CreatableSelect from 'react-select/creatable';
import { Controller } from 'react-hook-form';

export const MultipleSelect = ({ options, label, control, ...props }) => {
  const styles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--dark-7)' : 'rgba(0, 0, 0, 0)',
      color: 'var(--gray-0)',
      padding: '6px 12px',
      outline: 'rgba(0, 0, 0, 0)',
      border: state.isFocused
        ? '1px solid var(--gray-1)'
        : '1px solid var(--gray-8)',
      boxShadow: state.isFocused && 'none',
      fontWeight: 400,
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '14px',
      lineHeight: 1,
      '&:hover': {
        border: state.isFocused
          ? '1px solid var(--gray-1)'
          : '1px solid var(--gray-8)',
        boxShadow: state.isFocused && 'none',
      },
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'var(--dark-7)',
      color: 'var(--gray-0)',
      fontWeight: 400,
      fontFamile: '"Open Sans", sans-serif',
      fontSize: '14px',
      lineHeight: 1,
      boxShadow: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--dark-7)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--dark-4)',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      backgroundColor: 'var(--dark-4)',
      color: 'var(--gray-0)',
      padding: '7px',
      fontSize: '14px',
      lineHeight: 1,
    }),
    indicatorSeparator: () => ({
      display: 'none !important',
    }),
  };

  return (
    <Controller
      control={control}
      name={label}
      rules={{ required: `Field ${label} is required` }}
      render={({ field }) => (
        <CreatableSelect
          isMulti
          styles={styles}
          options={options}
          defaultValue={field.value}
          onChange={(val) => field.onChange(val)}
          {...props}
        />
      )}
    />
  );
};
