import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupAddComponent } from './user-group-add/user-group-add.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { TagsComponent } from './tags/tags.component';
import { CategoryComponent } from './category/category.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { CreateExamComponent } from './exam/create-exam/create-exam.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { ExamUpdateComponent } from './exam/exam-update/exam-update.component';
import { ListTestComponent } from './test/list-test/list-test.component';
import { ListCreateComponent } from './test/list-create/list-create.component';
import { ListDetailComponent } from './test/list-detail/list-detail.component';
import { ListUpdateComponent } from './test/list-update/list-update.component';
import { ViewListSemasterComponent } from './view-list-semaster/view-list-semaster.component';
import { QuestionRouting } from './question-router';


import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { ManagerSemesterExamTestComponent } from './manager-semester-exam-test/manager-semester-exam-test.component';
import { ViewListSemastertotestComponent } from './view-list-semastertotest/view-list-semastertotest.component';
import { ViewlistTestbySemesterComponent } from './viewlist-testby-semester/viewlist-testby-semester.component';
import { ThiChitietbaithiComponent } from './thi-chitietbaithi/thi-chitietbaithi.component';
import { RoleComponent } from './role/role.component';
import { from } from 'rxjs';
import { ListExamUserComponent } from './list-exam-user/list-exam-user.component';
import { DetailExamCustomerComponent } from './detail-exam-customer/detail-exam-customer.component';

import { ThiKetquathiComponent } from './thi-ketquathi/thi-ketquathi.component';
import { RoleActionComponent } from './roleaction/roleaction.component';
import { RoleActionAddComponent } from './role-action-add/role-action-add.component';
import { AuthGuard } from './_guards/auth.guard';
import { ExportExamComponent } from './exam/exam-list/export-exam/export-exam.component';
import { ExamDetailQuestionComponent } from './exam/exam-detail-question/exam-detail-question.component';
import { TestingComponent } from './testing/testing.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { DetailQuestionComponent } from './detail-question/detail-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ImportQuestionComponent } from './import-question/import-question.component';
import { ExamImportComponent } from './exam/exam-import/exam-import.component';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import{SubjectComponent} from './subject/subject.component';
const routes: Routes = [

  {
    path: '',
    children: [{
      path: '',
      component: HomeComponent,
    },
    {
      path: 'semestercustomer/:id',
      component: ListExamUserComponent,
    },
    {
      path: 'DetailExamCustomer/:id',
      component: DetailExamCustomerComponent,
    }


    ]
  },
  {
    path:'subject',
    component:SubjectComponent,
  },
  // { path: '**',
  //   redirectTo:'login',
  //   pathMatch: 'full' 
  // },
  // { path: 'error', component: ErrorsComponent },
  {
    path: 'Role',
    children: [{
      path: '',
      component: RoleComponent,
    },
    {
      path: ':RoleId',
      component: RoleActionComponent
    },
    {
      path: 'RoleActionAdd/:RoleId',
      component: RoleActionAddComponent
    }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tag',
    component: TagsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'category',
    component: CategoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'success',
    component: GroupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user',
    children: [{
      path: '',
      component: UserComponent,
    },
    {
      path: 'create',
      component: UserCreateComponent
    },
    {
      path: 'update/:Id',
      component: UserUpdateComponent
    },
    ], canActivate: [AuthGuard]
  },

  {
    path: 'exam',
    children: [
      {
        path: '',
        component: ExamListComponent,
        pathMatch: 'full'
      },
      {
        path:'import',
        component: ExamImportComponent,
      },
      {
        path: 'export/:Id',
        component: ExportExamComponent
      },
      {
        path: 'create',
        component: CreateExamComponent,
      },
      {
        path: ':examID',
        component: ExamDetailComponent
      },
      {
        path: 'examquestion/:examID',
        component: ExamDetailQuestionComponent
      },

      {
        path: 'update/:Id',
        component: ExamUpdateComponent
      }

    ], canActivate: [AuthGuard]
  },
  {
    path: 'test',
    children: [
      {
        path: '',
        component: ListTestComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: ListCreateComponent
      },
      {
        path: ':testID',
        component: ListDetailComponent
      },
      {
        path: 'update/:Id',
        component: ListUpdateComponent
      }
    ], //canActivate: [AuthGuard]
  },
  {
    path: 'group',
    children: [
      {
        path: '',
        component: GroupComponent,
        pathMatch: 'full'
      },
      {
        path: ':groupId',
        component: GroupDetailComponent
      },
      {
        path: 'usergroup',
        children: [
          {
            path: '',
            component: GroupComponent,
          },
          {
            path: ':groupId',
            component: UserGroupComponent
          },
          {
            path: 'usergroupadd/:groupId',
            component: UserGroupAddComponent
          }
        ]
      }
    ], canActivate: [AuthGuard]
  },
  {
    path: '',

    children:
      [
        {
          path: '',
          component: ViewListSemasterComponent,
          pathMatch: 'full'
        }
        ,

        {
          path: 'detail/:Id',

          component: SemesterDetailComponent


        }

      ], canActivate: [AuthGuard]
  }
  ,
  {
    path: 'thi',

    children:
      [
        {
          path: '',
          component: ViewListSemastertotestComponent,
        }
        ,
        {
          path: ':Id',

          children:
            [
              {
                path: '',
                component: ViewlistTestbySemesterComponent,
              }
              ,
              {
                path: ':TestId',

                children:
                  [
                    {
                      path: '',
                      component: ThiChitietbaithiComponent,
                    }
                    ,
                    {
                      path: 'thi',
                      component: TestingComponent
                    },
                    {
                      path: 'ketqua',
                      component: ThiKetquathiComponent
                    }
                  ]
              }
            ]
        }
      ],canActivate: [AuthGuard],
      
  },
  {
    path: 'test',
    children: [
      {
        path: '',
        component: ListTestComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: ListCreateComponent
      },
      {
        path: ':examID',
        component: ListDetailComponent
      },
      {
        path: 'update/:Id',
        component: ListUpdateComponent
      }
    ], canActivate: [AuthGuard]
  },
  // {
  //   path: 'SemesterExamManager',
  //   component: ViewListSemasterComponent, canActivate: [AuthGuard]
  // },
  {
    path: 'SemesterExamManager',

    children:
      [
        {
          path: '',
          component: ViewListSemasterComponent,
          pathMatch: 'full'
        }
        ,

        {
          path: 'detail/:Id',

          component: SemesterDetailComponent


        }
        ,
        {
          path:'candidates/:Id',
          component:AddCandidatesComponent
        }

      ], canActivate: [AuthGuard]
  }
  ,
  {
    path: 'question',
    children: [
      {
        path: '',
        component: ViewListQuestionComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateQuestionComponent
      },
      {
        path: ':id/detail',
        component: DetailQuestionComponent
      },
      {
        path: ':id/update',
        component: EditQuestionComponent
      },
      {
        path: 'import',
        component: ImportQuestionComponent
      }

    ],
  },

  {path:'Error',component:ErrorpageComponent},
  { path: '**', canActivate: [AuthGuard], component: ErrorpageComponent }
];

const fullRoutes = [...routes, ...QuestionRouting];
// console.log(fullRoutes);
@NgModule({
  imports: [RouterModule.forRoot(fullRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 