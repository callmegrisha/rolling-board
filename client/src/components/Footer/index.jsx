import { Container } from '../Container';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__container}>
        <span className={styles.footer__copyright}>
          © 2023. Petrov Hryhorii
        </span>
      </Container>
    </footer>
  );
};
