import styles from './Form.module.css';

export const Form = ({ className, children, onSubmitFunction }) => {
  return (
    <form
      onSubmit={onSubmitFunction}
      className={[styles.form, `${className ? className : ''}`].join(' ')}
    >
      {children}
    </form>
  );
};
