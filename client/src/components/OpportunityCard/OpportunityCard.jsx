import classNames from 'classnames';
import styles from './OpportunityCard.module.css';

export const OpportunityCard = ({ className, title, description }) => {
  return (
    <article
      className={classNames(
        styles.opportunity,
        className ? styles[className] : ''
      )}
    >
      <span className={styles.opportunity__title}>{title}</span>
      <p className={styles.opportunity__description}>{description}</p>
    </article>
  );
};
