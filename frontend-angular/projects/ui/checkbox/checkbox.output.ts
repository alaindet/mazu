export interface MazuCheckboxEvent<T = any> {
	isChecked: boolean;
	value: T;
}

export interface MazuCheckboxOutput {
  changed: MazuCheckboxEvent;
}
