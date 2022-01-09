import { FC } from 'react';

import { NavigationLink } from '../../types';
import { NavigationItem } from '../navigation-item/navigation-item';

export interface NavigationProps {
  links: NavigationLink[];
}

export const Navigation: FC<NavigationProps> = ({
  links,
}) => {
  return (
    <nav>
      <ul>
        {links.map(link => (
          <li key={link.url}>
            <NavigationItem {...link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
