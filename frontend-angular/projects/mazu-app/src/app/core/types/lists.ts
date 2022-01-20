export interface CreateListDto {
  name: string;
  // TODO
}

export interface UpdateListDto {
  name?: string;
  // TODO
}

export interface List {
  listId: string;
  name: string;
  // TODO
}

export interface ImplicitUpdateListDto {
  listId: string;
}
