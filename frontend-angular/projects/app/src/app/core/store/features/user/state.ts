export interface UserState {
  jwt: string | null;
  isLoading: boolean;
}

export const userInitialState: UserState = {
  jwt: null,
  isLoading: false,
};
