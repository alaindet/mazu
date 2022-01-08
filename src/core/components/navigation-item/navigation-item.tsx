import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from 'src/common/components';

export interface NavigationItemProps {
  icon: string;
  label: string;
  url: string;
}

export const NavigationItem: FC<NavigationItemProps> = ({
  icon,
  label,
  url,
}) => {
  return (
    <button type="button">
      <Icon name={icon} />
      <Link to={url}>{label}</Link>
    </button>
  );
};
