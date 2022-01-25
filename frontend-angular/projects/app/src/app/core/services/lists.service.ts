import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@/app/environment';
import { CreateListDto, UpdateListDto, List, ServerResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ListsService {

  baseUrl = `${environment.apiUrl}/lists`;

  constructor(
    private http: HttpClient,
  ) {}

  create(dto: CreateListDto): Observable<ServerResponse<List>> {
    const url = this.baseUrl;
    return this.http.post<ServerResponse<List>>(url, dto);
  }

  getAll(): Observable<ServerResponse<List[]>> {
    const url = this.baseUrl;
    return this.http.get<ServerResponse<List[]>>(url);
  }

  getOne(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/:listid`
      .replace(':listid', listId);
    return this.http.get<ServerResponse<List>>(url);
  }

  markAsFavorite(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/:listid/mark`
      .replace(':listid', listId);
    return this.http.patch<ServerResponse<List>>(url, null);
  }

  unmarkAsFavorite(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/:listid/unmark`
      .replace(':listid', listId);
    return this.http.patch<ServerResponse<List>>(url, null);
  }

  update(dto: UpdateListDto): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/:listid`
      .replace(':listid', dto.listId);
    return this.http.patch<ServerResponse<List>>(url, dto);
  }

  delete(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/:listid`
      .replace(':listid', listId)
    return this.http.delete<ServerResponse<List>>(url);
  }
}
