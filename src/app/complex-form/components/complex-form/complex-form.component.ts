import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

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
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  phoneCtrl!: FormControl;
  loginInfoForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;

  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

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
    this.emailCtrl = this.formBuilder.control('', { updateOn: 'blur' });
    this.confirmEmailCtrl = this.formBuilder.control('', { updateOn: 'blur' });
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    });
    this.phoneCtrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.confirmPasswordCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, { validators: confirmEqualValidator('password', 'confirmPassword') });
  }

  initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      map(value => value === 'email'),
      startWith(true),
      tap(showEmail => {
        if (showEmail) {
          this.emailCtrl.addValidators([Validators.required, Validators.email]);
          this.confirmEmailCtrl.addValidators(Validators.required);
          this.emailForm.addValidators(confirmEqualValidator('email', 'confirm'));
        } else {
          this.emailCtrl.clearValidators();
          this.confirmEmailCtrl.clearValidators();
        }
        this.emailCtrl.updateValueAndValidity();
        this.confirmEmailCtrl.updateValueAndValidity();
      })
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      map(value => value === 'phone'),
      tap(showPhone => {
        showPhone ? this.phoneCtrl.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]) : this.phoneCtrl.clearValidators();
        this.phoneCtrl.updateValueAndValidity();
      })
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || (!this.emailCtrl.touched || !this.confirmEmailCtrl.touched) || !this.emailForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    );
    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || (!this.passwordCtrl.touched || !this.confirmPasswordCtrl.touched) || !this.loginInfoForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    )
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

  getErrorMessage(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'Vous devez entrer une adresse mail valable';
    } else if (ctrl.hasError('minlength') || ctrl.hasError('maxlength')) {
      return 'Ce numéro n\'a pas le bon nombre de chiffres';
    } else {
      return 'Ce champ n\'est pas valable';
    }
  }
}
