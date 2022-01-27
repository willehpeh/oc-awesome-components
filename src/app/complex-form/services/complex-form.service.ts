import { Injectable } from '@angular/core';
import { ComplexFormValue } from '../models/complex-form-value.model';
import { catchError, delay, mapTo, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ComplexFormService {

  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post('http://localhost:3000/api/users', formValue).pipe(
      mapTo(true),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }
}
