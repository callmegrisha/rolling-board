import ReactDOM from 'react-dom';
import { FormWrap } from '../FormWrap';
import { DeleteButton } from '../../UI/DeleteButton';
import styles from './Modal.module.css';

const Modal = ({ title, children, isShowing, hide }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <div className={styles.modal} onClick={hide}>
          <div
            className={styles.modal__content}
            onClick={(e) => e.stopPropagation()}
          >
            <DeleteButton className='close-btn' onClick={hide} />
            <FormWrap title={title}>{children}</FormWrap>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
