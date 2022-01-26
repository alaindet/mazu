export interface MazuButtonInput {
  color: 'primary' | 'primary-outline' | 'secondary';
  size: 'small' | 'medium' | 'large';
  withFullWidth?: boolean | string;
  withIcon?: 'left' | 'right';
  isDisabled?: boolean | string;
}
