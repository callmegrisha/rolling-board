import styles from './Label.module.css';

export const Label = ({ className, title, children }) => {
  return (
    <label className={`${styles.label} ${className && className}`}>
      {title && <span>{title}</span>}
      {children}
    </label>
  );
};
