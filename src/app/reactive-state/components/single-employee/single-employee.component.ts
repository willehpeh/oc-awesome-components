import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap, take } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss']
})
export class SingleEmployeeComponent implements OnInit {

  loading$!: Observable<boolean>;
  employee$!: Observable<Employee>;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loading$ = this.employeesService.loading$;
    this.initObservables();
  }

  initObservables() {
    this.employee$ = this.route.params.pipe(
      take(1),
      map(params => +params['id']),
      switchMap(id => this.employeesService.getEmployeeById(id)),
    );
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/employees');
  }
}
