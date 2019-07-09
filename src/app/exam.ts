import { Category } from './ICategory';

export interface Exam {

    Id: number,
    NameExam: string,
    CreateBy: string,
    QuestionNumber: number,
    Status: boolean,
    SpaceQuestionNumber: number,
    CreateAt: Date,
    EnDate:Date;

    Categorys: object,
    Category: Category,
    CategoryId: string,
    Note: string,
    NameCategory: string,
    StartDate:Date;
    TestName:string;
    SemesterName:string;
    SemesterExam:[{SemesterName:string}]
    Tags: [{ Id: string; Name: string }]
}
