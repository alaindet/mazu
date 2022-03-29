export interface MazuInputApi {
  setValue: (value: string) => void;
  getValue: () => string;
  focus: () => void;
  clear: () => void;
  clearAndFocus: () => void;
}
