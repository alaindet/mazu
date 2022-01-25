export interface ServerResponse<T = any> {
  message: string;
  data: T;
}

export type ServerResponseWithoutData = ServerResponse<null>;
