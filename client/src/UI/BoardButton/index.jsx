import styles from './BoardButton.module.css';

export const BoardButton = ({ className, children, ...props }) => {
  return (
    <button
      className={[
        styles['board-btn'],
        `${className ? className : ''}`,
        'btn-reset',
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
