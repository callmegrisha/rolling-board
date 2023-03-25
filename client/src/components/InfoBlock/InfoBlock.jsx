import styles from './InfoBlock.module.css';

export const InfoBlock = ({ className, subtitle, title, description }) => {
  return (
    <div className={`${styles['info-block']} ${className ? className : ''}`}>
      <span className={styles['info-block__subtitle']}>{subtitle}</span>
      <h2 className={styles['info-block__title']}>{title}</h2>
      <p className={styles['info-block__description']}>{description}</p>
    </div>
  );
};
