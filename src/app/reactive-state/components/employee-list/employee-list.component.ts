import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  loading$!: Observable<boolean>;
  employees$!: Observable<Employee[]>;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.initObservables();
    this.employeesService.getEmployeesFromServer();
  }

  initObservables() {
    this.loading$ = this.employeesService.loading$;
    this.employees$ = this.employeesService.employees$;
  }

}
