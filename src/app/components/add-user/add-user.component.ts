import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  
  @ViewChild('chipList') chipList;
  @ViewChild('resetUserForm') myNgForm;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm: FormGroup;

  ngOnInit():void {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userApi: ApiService
  ) {}

 // /* Reactive book form */
  submitBookForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneno: ['', [Validators.required]],
    });
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  /* Submit book */
  submitUserForm() {
    if (this.userForm.valid) {
      this.userApi.AddUser(this.userForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/view-all'));
      });
    }
  }
}
