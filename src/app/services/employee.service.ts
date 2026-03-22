import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:5269/api/employees';

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(){
    this.http.get<Employee[]>(this.apiUrl)
      .subscribe(data => this.employeesSubject.next(data));
  }

  getById(id: number){
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(e: Employee){
    return this.http.post<Employee>(this.apiUrl, e);
  }

  update(id: number, e: Employee){
    return this.http.put(`${this.apiUrl}/${id}`, e);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
