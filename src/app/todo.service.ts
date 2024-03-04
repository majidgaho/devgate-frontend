import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  save(data : any): Observable<any>{
    return this.http.post("http://localhost:8080/api/save", data);
  }

  update(id: number, data : any): Observable<any>{
    return this.http.put("http://localhost:8080/api/update/"+id, data);
  }

  delete(id : number): Observable<any>{
    return this.http.delete("http://localhost:8080/api/delete/"+id);
  }

  getAll(): Observable<any>{
    return this.http.get("http://localhost:8080/api/tasks");
  }

  getTask(id : number): Observable<any>{
    return this.http.get("http://localhost:8080/api/task/"+id);
  }


}
