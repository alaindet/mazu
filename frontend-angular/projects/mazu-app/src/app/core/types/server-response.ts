export interface ServerResponse<T = any> {
  message: string;
  data?: T;
}
