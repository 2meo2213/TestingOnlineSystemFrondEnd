import { Question } from './question';

export interface TestProcessing {
    Id: number ,
    TestName: string ,
    TestTime: number ,
    Questions: Question[],
    
}
