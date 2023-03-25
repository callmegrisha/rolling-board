import classNames from 'classnames';
import styles from './BoardButton.module.css';

export const BoardButton = ({ className, children, ...props }) => {
  return (
    <button
      className={classNames(styles['board-btn'], 'btn-reset', className || '')}
      {...props}
    >
      {children}
    </button>
  );
};
