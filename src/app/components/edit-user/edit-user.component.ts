import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetUserForm') myNgForm;
  userForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private userApi: ApiService
  ) { 
    //To get single user 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.userApi.GetUser(id).subscribe((data) => {
      this.userForm = this.fb.group({
        name: [data.name, [Validators.required]],
        phoneno: [data.phoneno, [Validators.required]],
      });
    });
  }

  /* Reactive book form */
  updateForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneno: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  /* Update form */
  updateUserForm() {
    // console.log(this.userForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.userApi
        .UpdateUser(id, this.userForm.value)
        .subscribe((res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/view-all'));
        });
    }
  }

}