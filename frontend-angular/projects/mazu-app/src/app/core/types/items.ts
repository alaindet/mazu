export interface CreateItemDto {
  listId: string;
  name: string;
  amount: number;
  description?: string;
}

export interface UpdateItemDto {
  itemId: string;
  listId: string;
  name?: string;
  amount?: number;
  description?: string;
  isDone?: boolean;
}

export interface Item {
  itemId: string;
  listId: string;
  name: string;
  amount: number;
  description: string;
  isDone: boolean;
}

export interface ImplicitUpdateItemDto {
  listId: string;
  itemId: string;
}
