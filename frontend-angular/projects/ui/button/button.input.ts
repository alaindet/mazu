export interface MazuButtonInput {
  color: (
    | 'primary'
    | 'primary-outline'
    | 'primary-clear'
    | 'primary-clear-reverse'
    | 'secondary'
    | 'secondary-clear'
  );
  size: 'small' | 'medium' | 'large';
  withFullWidth?: boolean | string;
  withIcon?: 'left' | 'right';
  isDisabled?: boolean | string;
}
