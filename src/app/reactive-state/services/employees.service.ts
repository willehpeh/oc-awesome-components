import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeesService {

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable().pipe(
      delay(0)
    );
  }

  private _employees$ = new BehaviorSubject<Employee[]>([]);
  get employees$(): Observable<Employee[]> { return this._employees$.asObservable(); }

  private allEmployeesLastLoad!: number;

  constructor(private http: HttpClient) {}

  getEmployeesFromServer() {
    if (Date.now() - this.allEmployeesLastLoad <= 10000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Employee[]>('http://localhost:3000/employees').pipe(
      delay(1000),
      tap(employees => {
        this.allEmployeesLastLoad = Date.now();
        this._employees$.next(employees);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getSingleEmployeeFromServer(id: number) {
    this.setLoadingStatus(true);
    this.http.get<Employee[]>(`http://localhost:3000/employees?id=${id}`).pipe(
      delay(1000),
      tap(employees => {
        this._employees$.next([...employees]);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getEmployeeById(id: number) {
    return this.employees$.pipe(
      map(employees => employees.filter(employee => employee.id === id)[0]),
      tap(employee => {
        if (!employee) {
          this.getSingleEmployeeFromServer(id);
        }
      })
    );
  }

  private setLoadingStatus(status: boolean) {
    this._loading$.next(status);
  }
}
