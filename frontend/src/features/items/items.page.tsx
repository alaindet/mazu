import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const ItemsPage: FC<{}> = () => {
  const { id } = useParams();

  return (
    <>
      <h2>Items from list #{id}</h2>
      <p>Items here...</p>
    </>
  );
};
