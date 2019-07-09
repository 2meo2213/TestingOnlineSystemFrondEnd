import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { DetailQuestionComponent } from './detail-question/detail-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ImportQuestionComponent } from './import-question/import-question.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const QuestionRouting: Routes = [{
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
}];

export { QuestionRouting };
