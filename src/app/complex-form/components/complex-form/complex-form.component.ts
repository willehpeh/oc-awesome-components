import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss'],
})
export class ComplexFormComponent implements OnInit {

  loading = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
              private complexFormService: ComplexFormService) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initFormObservables();
    this.initMainForm();
  }

  initFormControls() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.contactPreferenceCtrl = this.formBuilder.control('email');
    this.emailForm = this.formBuilder.group({
      email: [''],
      confirm: ['']
    });
    this.phoneCtrl = this.formBuilder.control(null);
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      map(value => value === 'email'),
      startWith(true),
      tap(showEmail => {
        if (showEmail) {
          this.emailForm.get('email')?.addValidators([Validators.required, Validators.email]);
          this.emailForm.get('confirmEmail')?.addValidators(Validators.required);
        } else {
          this.emailForm.get('email')?.clearValidators();
          this.emailForm.get('confirmEmail')?.clearValidators();
        }
        this.emailForm.get('email')?.updateValueAndValidity();
        this.emailForm.get('confirmEmail')?.updateValueAndValidity();
      })
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      map(value => value === 'phone'),
      tap(showPhone => {
        showPhone ? this.phoneCtrl.addValidators(Validators.required) : this.phoneCtrl.clearValidators();
        this.phoneCtrl.updateValueAndValidity();
      })
    );
  }

  initMainForm() {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }

  onSubmitForm() {
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(response => {
        this.loading = false;
        if (!response) {
          console.error('Something went wrong!');
        }
      })
    ).subscribe();
  }
}
