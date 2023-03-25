import classNames from 'classnames';
import styles from './Container.module.css';

export const Container = ({ className, children }) => {
  return (
    <div className={classNames(styles.container, className || '')}>
      {children}
    </div>
  );
};
