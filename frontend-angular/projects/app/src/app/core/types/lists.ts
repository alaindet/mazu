export interface CreateListDto {
  name: string;
  description?: string;
}

export interface UpdateListDto {
  listId: string;
  name?: string;
  isFavorite?: boolean;
  description?: string;
}

export interface List {
  listId: string;
  name: string;
  isFavorite: boolean;
  description: string;
}
