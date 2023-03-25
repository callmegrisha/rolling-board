import classNames from 'classnames';

import styles from './Form.module.css';

export const Form = ({ className, children, onSubmitFunction }) => {
  return (
    <form
      onSubmit={onSubmitFunction}
      className={classNames(styles.form, className || '')}
    >
      {children}
    </form>
  );
};
