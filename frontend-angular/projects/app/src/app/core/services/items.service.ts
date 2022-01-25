import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@/app/environment';
import { CreateItemDto, UpdateItemDto, Item, List, ServerResponse, ServerResponseWithoutData, ImplicitUpdateItemDto } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  baseUrl = `${environment.apiUrl}/lists/:listid/items`;

  constructor(
    private http: HttpClient,
  ) {}

  create(dto: CreateItemDto): Observable<ServerResponse<Item>> {
    const url = this.baseUrl
      .replace(':listid', dto.listId);
    return this.http.post<ServerResponse<Item>>(url, dto);
  }

  getAll(listId: Item['listId']): Observable<ServerResponse<Item[]>> {
    const url = this.baseUrl
      .replace(':listid', listId);
    return this.http.get<ServerResponse<Item[]>>(url);
  }

  markAsDone(dto: ImplicitUpdateItemDto): Observable<ServerResponse<Item>> {
    const url = `${this.baseUrl}/:itemid/mark`
      .replace(':listid', dto.listId)
      .replace(':itemid', dto.itemId);
    return this.http.patch<ServerResponse<Item>>(url, {});
  }

  unmarkAsDone(dto: ImplicitUpdateItemDto): Observable<ServerResponse<Item>> {
    const url = `${this.baseUrl}/:itemid/unmark`
      .replace(':listid', dto.listId)
      .replace(':itemid', dto.itemId);
    return this.http.patch<ServerResponse<Item>>(url, {});
  }

  update(dto: UpdateItemDto): Observable<ServerResponse<Item>> {
    const url = `${this.baseUrl}/:itemid`
      .replace(':listid', dto.listId)
      .replace(':itemid', dto.itemId);
    return this.http.patch<ServerResponse<Item>>(url, dto);
  }

  delete(dto: UpdateItemDto): Observable<ServerResponse<Item>> {
    const url = `${this.baseUrl}/:itemid`
      .replace(':listid', dto.listId)
      .replace(':itemid', dto.itemId);
    return this.http.delete<ServerResponse<Item>>(url);
  }

  // Bulk
  markAllAsDone(listId: List['listId']): Observable<ServerResponseWithoutData> {
    const url = `${this.baseUrl}/all/mark`
      .replace(':listid', listId);
    return this.http.patch<ServerResponseWithoutData>(url, null);
  }

  // Bulk
  unmarkAllAsDone(listId: List['listId']): Observable<ServerResponseWithoutData> {
    const url = `${this.baseUrl}/all/unmark`
      .replace(':listid', listId);
    return this.http.patch<ServerResponseWithoutData>(url, null);
  }

  // Bulk
  deleteAll(listId: List['listId']): Observable<ServerResponseWithoutData> {
    const url = `${this.baseUrl}/all`
      .replace(':listid', listId);
    return this.http.delete<ServerResponseWithoutData>(url);
  }

  // Bulk
  deleteAllMarkedAsDone(listId: List['listId']): Observable<ServerResponse<number>> {
    const url = `${this.baseUrl}/all/marked`
      .replace(':listid', listId);
    return this.http.delete<ServerResponse<number>>(url);
  }
}
