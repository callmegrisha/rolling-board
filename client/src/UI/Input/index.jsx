import './Input.css';

export const Input = ({
  className,
  type,
  placeholder,
  register,
  label,
  validation,
  ...props
}) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      {...register(label, validation)}
      {...props}
    />
  );
};
