import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
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
        name: [data.name],
        phoneno: [data.phoneno],
      });
    });
  }

  /* Reactive book form */
  updateForm() {
    this.userForm = this.fb.group({
      name: [''],
      phoneno: [''],
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

}
