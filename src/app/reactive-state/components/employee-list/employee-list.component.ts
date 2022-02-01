import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { FormControl } from '@angular/forms';

type SearchType = 'lastName' | 'firstName' | 'company';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  private destroy$!: Subject<boolean>;

  loading$!: Observable<boolean>;
  employees$!: Observable<Employee[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;

  constructor(private employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.initForm();
    this.initObservables();
    this.employeesService.getEmployeesFromServer();
  }

  private initForm() {
    this.searchCtrl = new FormControl('');
    this.searchTypeCtrl = new FormControl('lastName');
  }

  private initObservables() {
    this.loading$ = this.employeesService.loading$;
    const searchTerm$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value: string) => value.toLowerCase())
    );
    const searchType$ = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    this.employees$ = combineLatest({
      search: searchTerm$,
      type: searchType$
    }).pipe(
      takeUntil(this.destroy$),
      switchMap(value => this.employeesService.employees$.pipe(
        map(employees => employees.filter(employee => employee[value.type as SearchType]
          .toLowerCase()
          .includes(value.search))),
      ))
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
