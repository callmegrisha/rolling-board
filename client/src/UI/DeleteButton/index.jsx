import closeIcon from '../../images/close.svg';

export const DeleteButton = ({ className, icon, ...props }) => {
  return (
    <button
      className={`btn-reset ${className ? className : ''}`}
      type='button'
      {...props}
    >
      <img src={closeIcon} alt='Icon Close' />
    </button>
  );
};
