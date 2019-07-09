import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {SelectModule} from 'ng2-select';
import {
  MatButtonModule,
  MatSortModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';

import { AuthenticationService } from '../app/_services/authentication.service';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import { GroupComponent } from './group/group.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupAddComponent } from './user-group-add/user-group-add.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TagsComponent } from './tags/tags.component';
import { CategoryComponent } from './category/category.component';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ImportQuestionComponent } from './import-question/import-question.component';
import { ExportQuestionComponent } from './export-question/export-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ManagerSemesterExamTestComponent } from './manager-semester-exam-test/manager-semester-exam-test.component';
import { SemesterDetailComponent } from './semester-detail/semester-detail.component';


import { ViewListSemastertotestComponent } from './view-list-semastertotest/view-list-semastertotest.component';
import { ViewlistTestbySemesterComponent } from './viewlist-testby-semester/viewlist-testby-semester.component';
import { ThiChitietbaithiComponent } from './thi-chitietbaithi/thi-chitietbaithi.component';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { CreateExamComponent } from './exam/create-exam/create-exam.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { ExamUpdateComponent } from './exam/exam-update/exam-update.component';
import { ListTestComponent } from './test/list-test/list-test.component';
import { ListCreateComponent } from './test/list-create/list-create.component';
import { ListDetailComponent } from './test/list-detail/list-detail.component';
import { ListUpdateComponent } from './test/list-update/list-update.component';
import { ViewListSemasterComponent } from './view-list-semaster/view-list-semaster.component';
import { DetailQuestionComponent } from './detail-question/detail-question.component';
import { RoleComponent } from './role/role.component';
// import { ExamDetailQuestionComponent } from './exam/exam-detail-question/exam-detail-question.component';
// import { ThiKetquathiComponent } from './thi-ketquathi/thi-ketquathi.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ListExamUserComponent } from './list-exam-user/list-exam-user.component';
import { DetailExamCustomerComponent } from './detail-exam-customer/detail-exam-customer.component';
import { ExamDetailQuestionComponent } from './exam/exam-detail-question/exam-detail-question.component';
import { ThiKetquathiComponent } from './thi-ketquathi/thi-ketquathi.component';
import { RoleActionAddComponent } from './role-action-add/role-action-add.component';
import { RoleActionComponent } from './roleaction/roleaction.component';
import { AuthGuard } from './_guards/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { ExportExamComponent } from './exam/exam-list/export-exam/export-exam.component';
import { TestingComponent } from './testing/testing.component';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import{ CandidatesComponent } from './candidates/candidates.component';
import { ExamImportComponent } from './exam/exam-import/exam-import.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { QuestionRouting } from './question-router';
import { SubjectComponent } from './subject/subject.component';
@NgModule({
  declarations: [
    ExamListComponent,
    CreateExamComponent,
    ExamDetailComponent,
    ExamUpdateComponent,
    ListTestComponent,
    ListCreateComponent,
    ListUpdateComponent,
    ListDetailComponent,
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    DashboardComponent,
    ViewListQuestionComponent,
    CreateQuestionComponent,
    GroupComponent,
    GroupDetailComponent,
    UserGroupComponent,
    UserGroupAddComponent,
    UserComponent,
    UserCreateComponent,
    UserUpdateComponent,
    HomeComponent,
    LoginComponent,
    TagsComponent,
    CategoryComponent,
    ImportQuestionComponent,
    ExportQuestionComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    ManagerSemesterExamTestComponent,
    SemesterDetailComponent,
    ViewListSemasterComponent,
    ViewListSemastertotestComponent,
    ViewlistTestbySemesterComponent,
    ThiChitietbaithiComponent,
    ExamImportComponent,
    ViewListSemasterComponent,
    SemesterDetailComponent,
    DetailQuestionComponent,
    RoleComponent,
    ListExamUserComponent,
    DetailExamCustomerComponent,
    AddCandidatesComponent,
    // ExamDetailQuestionComponent,
    // ThiKetquathiComponent,

   ExamDetailQuestionComponent,

   ThiKetquathiComponent,

    RoleActionAddComponent,

    RoleActionComponent,

    ExportExamComponent,

    TestingComponent,
    CandidatesComponent,
    ErrorpageComponent,
    UserHeaderComponent,
    SubjectComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CKEditorModule,
    MatProgressBarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SelectModule,
    ToastrModule.forRoot(),
    NgxTrimDirectiveModule,
    AppRoutingModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
