import { FC } from 'react';

export interface IconProps {
  name: string;
}

export const Icon: FC<IconProps> = ({
  name
}) => {
  return (
    <i className="icon"></i>
  );
};
