import ContentLoader from 'react-content-loader';

export const ColumnsLoader = (props) => (
  <ContentLoader
    speed={4}
    width={930}
    height={500}
    viewBox='0 0 930 500'
    backgroundColor='var(--dark-5)'
    foregroundColor='var(--dark-7)'
    {...props}
  >
    <rect x='0' y='0' rx='8' ry='8' width='296' height='500' />
    <rect x='316' y='0' rx='8' ry='8' width='296' height='500' />
    <rect x='632' y='0' rx='8' ry='8' width='296' height='500' />
  </ContentLoader>
);
