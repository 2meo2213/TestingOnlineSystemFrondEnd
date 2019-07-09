import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from '../Tag';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';




@Component({


  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  TagIdDelete = '';
  submitted = false;
  ctForm: FormGroup;
  tag: Tag;

  displayedColumn: string[] = ['select', 'Name', 'Description', 'Status', 'Action'];
  dataSource = new MatTableDataSource<Tag>(this.tags);
  data = Object.assign(TagsComponent);
  selection = new SelectionModel<Tag>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reverse: boolean = false;

  ///format status number --string
  FormatData(data) {
    if (data) {
      data.map(item => {
        item.StatusName = item.Status === 1 ? 'Active' : 'Disable';
      });
      return data;
    }
  }
  get Name(): FormControl {
    return this.ctForm.get('Name') as FormControl;


  }
  get Description(): FormControl {
    return this.ctForm.get('Description') as FormControl;
  }
  get Status(): FormControl {
    return this.ctForm.get('Status') as FormControl;
  }


///get data

  refreshTable() {
    this.http.get<string>('http://localhost:65170/api/Tag',{ headers: http() }).subscribe(value => {
      this.dataSource.data = this.FormatData(JSON.parse(value));
      console.log(this.FormatData(JSON.parse(value)));
      (this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }

 

  constructor(private myservice:MyserviceService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private toastr: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  ngOnInit() {
    this.refreshTable();
    

    this.ctForm = new FormGroup(
      {
        Name: new FormControl('', [Validators.required]),
        Description: new FormControl('', [Validators.required]),
        Status: new FormControl('', [Validators.required])

      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Tag): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Name + 1}`;
  }



  //delete all check box
  removeSelectedRows() {
    let arrId = '';
    this.selection.selected.forEach(item => {
      arrId += item.Id + ',';
    });

    arrId = arrId.substring(0, arrId.length - 1);
    this.http.post('http://localhost:65170/api/Tag?action=delete', JSON.stringify(arrId), { headers: http() }).subscribe((e) => {
      console.log(typeof (e));
      if (+e >= 1) {
        this.toastr.success('Delete all success!', 'List Tag!');
        this.refreshTable();
      } else if (+e == 0) {
        this.toastr.success('Delete all false!', 'List Tag!');
      } else {
        this.toastr.success('Something wrong!', 'List Tag!');
      }
    }
    );
    this.selection = new SelectionModel<Tag>(true, []);
  }


 //delete Tags
  deleteTag(TagId: string) {
    this.TagIdDelete = TagId;
  }

  delete() {
    this.http.delete('http://localhost:65170/api/Tag/' + this.TagIdDelete,{ headers: http() }).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(b => b.Id !== this.TagIdDelete);
      this.toastr.success('Delete success!', 'List Tag!');
    }
    );

  }


  //create Tags
  onSubmit() {
    if (this.ctForm.valid) {
      const value = this.ctForm.value;
      console.log(value);
      this.http.post('http://localhost:65170/api/Tag/', JSON.stringify(value), { headers: http() })
        .subscribe({
          next: (res) => {
            this.http.get<string>('http://localhost:65170/api/Tag/').subscribe(value => {
              this.dataSource.data = this.FormatData(JSON.parse(value));
             
            });
            this.toastr.info('Create success!', ' Tag!');
            this.ctForm.reset();
          },
          error: (err) => {
            console.error(err);
          }
        });
    }
  }
  /// Edit Tags

  onEdit(TagId: string) {
    this.http.get<string>('http://localhost:65170/api/Tag/' + TagId,{ headers: http() }).subscribe(value => {
      const tag = JSON.parse(value);
      const StatusName = tag.Status === 1 ? 'Active' : 'Disable';
      this.tag = { ...JSON.parse(value), StatusName };
      this.ctForm.patchValue(this.tag);
    });
  }

  reset() {
    this.ctForm.reset();
  }

  Edit(TagId: string) {
    console.log('click');
    if (this.ctForm.valid) {
      const value = this.ctForm.value;
      const formData = {
        ...this.tag,
        ...value
      };
      this.http
        .put('http://localhost:65170/api/Tag/' + TagId, formData,{ headers: http() })
        .subscribe(
          {
            next: (res) => {
              this.http.get<string>('http://localhost:65170/api/Tag/',{ headers: http() }).subscribe(value => {
                this.dataSource.data = this.FormatData(JSON.parse(value));
                
              });
              this.toastr.info('Edit success!', 'List Tag!');

            },

            error: (err) => {
              console.error(err);
            }

          }

        );
    }
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}
