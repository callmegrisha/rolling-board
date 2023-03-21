import { toast } from 'react-hot-toast';

export const notify = (message) => {
  const styles = {
    duration: 1500,
    style: {
      border: '1px solid var(--gray-8)',
      borderRadius: '10px',
      background: 'var(--dark-6)',
      color: 'var(--white)',
    },
  };

  return toast.error(message, styles);
};
