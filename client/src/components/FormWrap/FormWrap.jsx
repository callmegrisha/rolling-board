import classNames from 'classnames';
import styles from './FormWrap.module.css';

export const FormWrap = ({ className, title, children }) => {
  return (
    <div className={classNames(styles['form-wrap'], className || '')}>
      <div className='form-wrap__inner'>
        {title && <span className={styles['form-wrap__title']}>{title}</span>}
        {children}
      </div>
    </div>
  );
};
