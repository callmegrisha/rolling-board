import ContentLoader from 'react-content-loader';

export const ProjectsLoader = () => {
  return (
    <ContentLoader
      speed={4}
      width={295}
      height={260}
      viewBox='0 0 295 260'
      backgroundColor='var(--dark-5)'
      foregroundColor='var(--dark-7)'
    >
      <rect x='0' y='0' rx='17' ry='17' width='295' height='260' />
    </ContentLoader>
  );
};
