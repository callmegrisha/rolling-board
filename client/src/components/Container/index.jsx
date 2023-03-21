import styles from './Container.module.css';

export const Container = ({ className, children }) => {
  return (
    <div
      className={[styles.container, `${className ? className : ''}`].join(' ')}
    >
      {children}
    </div>
  );
};
