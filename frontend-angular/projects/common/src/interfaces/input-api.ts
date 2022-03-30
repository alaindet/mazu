export interface MazuInputApi {
  setValue: (value: string) => void;
  getValue: () => string;
  getNativeElement: () => HTMLInputElement;
  focus: () => void;
  clear: () => void;
  clearAndFocus: () => void;
}
