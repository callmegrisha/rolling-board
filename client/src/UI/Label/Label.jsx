import classNames from 'classnames';

import styles from './Label.module.css';

export const Label = ({ className, title, children }) => {
  return (
    <label className={classNames(styles.label, className || '')}>
      {title && <span>{title}</span>}
      {children}
    </label>
  );
};
