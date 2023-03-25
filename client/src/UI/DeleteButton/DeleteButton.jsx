import classNames from 'classnames';

import closeIcon from '../../images/close.svg';

export const DeleteButton = ({ className, icon, ...props }) => {
  return (
    <button
      className={classNames('btn-reset', className || '')}
      type='button'
      {...props}
    >
      <img src={closeIcon} alt='Icon Close' />
    </button>
  );
};
