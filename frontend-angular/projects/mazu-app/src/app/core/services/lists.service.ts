import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'projects/mazu-app/src/environments/environment';
import { CreateListDto, ImplicitUpdateListDto, UpdateListDto } from '../types';

// TODO: Entier service
@Injectable({
  providedIn: 'root',
})
export class ListsService {

  baseUrl = `${environment.apiUrl}/lists`;

  constructor(
    private http: HttpClient,
  ) {}

  create(dto: CreateListDto): Observable<any> {
    const url = 'TODO';
    return this.http.post(url, dto);
  }

  getAll(): Observable<any> {
    const url = 'TODO';
    return this.http.get(url);
  }

  getOne(listId: string): Observable<any> {
    const url = 'TODO';
    const params = new HttpParams();
    return this.http.get(url, { params });
  }

  markAsFavorite(dto: ImplicitUpdateListDto): Observable<any> {
    const url = 'TODO';
    return this.http.patch(url, dto);
  }

  unmarkAsFavorite(dto: ImplicitUpdateListDto): Observable<any> {
    const url = 'TODO';
    return this.http.patch(url, dto);
  }

  update(dto: UpdateListDto): Observable<any> {
    const url = 'TODO';
    return this.http.patch(url, dto);
  }

  delete(dto: ImplicitUpdateListDto): Observable<any> {
    const url = 'TODO';
    return this.http.delete(url);
  }
}
