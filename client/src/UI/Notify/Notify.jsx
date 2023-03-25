import styles from './Notify.module.css';

export const Notify = ({ message }) => {
  return (
    <div className={styles.notify}>
      <span>{message}</span>
    </div>
  );
};
