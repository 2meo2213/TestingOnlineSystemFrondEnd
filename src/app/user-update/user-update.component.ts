import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { http } from '../http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  user: User[] = [];
  public Editor = ClassicEditorBuild;
  editform: FormGroup;
  RolesFormApi: User[] = [];
  rolename: string;
  constructor(private myservice:MyserviceService, private router: Router, private fb: FormBuilder, private http: HttpClient, private ac: ActivatedRoute,private toar:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  get UserName(): FormControl {
    return this.editform.get('UserName') as FormControl;
  }
  get Password(): FormControl {
    return this.editform.get('Password') as FormControl;
  }
  get Roles(): FormGroup {
    return this.editform.get('Roles') as FormGroup;
  }
  get RoleId(): FormControl {
    return this.editform.get('RoleId') as FormControl;
  }
  get CreatedDate(): FormControl {
    return this.editform.get('CreatedDate') as FormControl;
  }
  get EditedDate(): FormControl {
    return this.editform.get('EditedDate') as FormControl;
  }
  get FullName(): FormControl {
    return this.editform.get('FullName') as FormControl;
  }
  get Phone(): FormControl {
    return this.editform.get('Phone') as FormControl;
  }
  get Email(): FormControl {
    return this.editform.get('Email') as FormControl;
  }
  get Address(): FormControl {
    return this.editform.get('Address') as FormControl;
  }
  get Department(): FormControl {
    return this.editform.get('Department') as FormControl;
  }
  get Position(): FormControl {
    return this.editform.get('Position') as FormControl;
  }
  get Avatar(): FormControl {
    return this.editform.get('Avatar') as FormControl;
  }
  get Status(): FormControl {
    return this.editform.get('Status') as FormControl;
  }
  get Note(): FormControl {
    return this.editform.get('Note') as FormControl;
  }

  getApiRoles() {
    this.http.get<string>('http://localhost:65170/api/role/',{ headers: http() }).subscribe(value => {
      this.RolesFormApi = JSON.parse(value);
    });
  }
  passwordPattern ="^[a-z0-9_@A-Z]*$";
  phonenumber = "^[0-9]{1,12}$";
  emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  ngOnInit() {
    this.getApiRoles();
    this.editform = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      Phone: ['', [Validators.required, Validators.pattern]],
      Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100),Validators.pattern(this.passwordPattern)]],
      FullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      Address: ['', [Validators.required]],
      Department: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      Position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      RoleId: [''],
      Status: [''],
      Avatar: [''],
      CreatedDate: [''],
      EditedDate: [''],
      Note: ['']
    });
    const userId = this.ac.snapshot.paramMap.get('Id');
    this.http.get<string>('http://localhost:65170/api/User/?idUser=' + userId,{ headers: http() }).subscribe(value => {
      this.rolename = value;
    });
    this.http.get<string>('http://localhost:65170/api/User/?userid=' + userId,{ headers: http() }).subscribe(value => {
      this.user = JSON.parse(value);
      this.editform.patchValue(JSON.parse(value));
    });

  }

  onSubmit(userName) {
    const value = this.editform.value;
    if (this.editform.valid) {
      const formData = {
        ...this.user,
        ...value
      };

      let temp = this.RolesFormApi.filter(s => s.RoleId == value.RoleId);
      value.Role = temp.length > 0 ? temp[0] : null;
      console.log(value);
      this.http.put('http://localhost:65170/api/User/' + formData.UserId, formData, { headers: http() }).subscribe({
        next: (res) => {
          console.log(res);
          this.toar.success('success', 'Update User');
        },
        error: (err) => {
          console.log(err);
          this.toar.warning('Fail', 'Update User');
        }
      });
    }
  }
validateForm() {
  if (this.editform.invalid) {
    this.editform.get('UserName').markAsTouched();
    this.editform.get('FullName').markAsTouched();
    this.editform.get('Email').markAsTouched();
    this.editform.get('Address').markAsTouched();
    this.editform.get('Department').markAsTouched();
    this.editform.get('Position').markAsTouched();
    this.editform.get('Phone').markAsTouched();
    this.editform.get('Password').markAsTouched();
    this.editform.get('RoleId').markAsTouched();
    return;
  }
}
}