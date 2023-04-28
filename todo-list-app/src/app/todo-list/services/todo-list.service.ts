import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'assets/data/todo-data.json';

  constructor(private http: HttpClient) { }

  getTodoItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
