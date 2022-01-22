// TODO: Move away
export interface Alert {
  message: string;
  type: 'success' | 'warning' | 'error';
}

export interface UiState {
  title: string;
  isLoading: boolean;
  loaderColor: 'primary' | 'error';
  alert: Alert | null;
}

export const uiInitialState: UiState = {
  title: 'Mazu: Make a list',
  isLoading: false,
  loaderColor: 'primary',
  alert: null,
};
