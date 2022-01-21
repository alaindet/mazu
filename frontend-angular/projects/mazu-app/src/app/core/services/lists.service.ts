import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'projects/mazu-app/src/environments/environment';
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
    return this.http.post<ServerResponse<List>>(this.baseUrl, dto);
  }

  getAll(): Observable<ServerResponse<List[]>> {
    return this.http.get<ServerResponse<List[]>>(this.baseUrl);
  }

  getOne(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/${listId}`;
    return this.http.get<ServerResponse<List>>(url);
  }

  markAsFavorite(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/${listId}/mark`;
    return this.http.patch<ServerResponse<List>>(url, {});
  }

  unmarkAsFavorite(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/${listId}/unmark`;
    return this.http.patch<ServerResponse<List>>(url, {});
  }

  update(dto: UpdateListDto): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/${dto.listId}`;
    return this.http.patch<ServerResponse<List>>(url, dto);
  }

  delete(listId: List['listId']): Observable<ServerResponse<List>> {
    const url = `${this.baseUrl}/${listId}`;
    return this.http.delete<ServerResponse<List>>(url);
  }
}
