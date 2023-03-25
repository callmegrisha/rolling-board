import './Button.css';

export const Button = ({ className, type, children, ...props }) => {
  return (
    <button className={className || ''} type={type} {...props}>
      {children}
    </button>
  );
};
