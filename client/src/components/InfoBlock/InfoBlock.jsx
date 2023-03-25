import classNames from 'classnames';

import styles from './InfoBlock.module.css';

export const InfoBlock = ({ className, subtitle, title, description }) => {
  return (
    <div className={classNames(styles['info-block'], className || '')}>
      <span className={styles['info-block__subtitle']}>{subtitle}</span>
      <h2 className={styles['info-block__title']}>{title}</h2>
      <p className={styles['info-block__description']}>{description}</p>
    </div>
  );
};
