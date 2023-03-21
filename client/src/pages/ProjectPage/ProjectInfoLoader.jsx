import ContentLoader from 'react-content-loader';

export const ProjectInfoLoader = (props) => (
  <ContentLoader
    speed={3}
    width={500}
    height={82}
    viewBox='0 0 500 82'
    backgroundColor='var(--dark-5)'
    foregroundColor='var(--dark-7)'
    {...props}
  >
    <rect x='0' y='57' rx='8' ry='8' width='400' height='24' />
    <rect x='0' y='0' rx='8' ry='8' width='250' height='45' />
  </ContentLoader>
);
