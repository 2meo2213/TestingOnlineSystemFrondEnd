import { Question } from './question';

export interface ProcessingTest {
  Id: number ;
  TestName: string;
  TestTime: number;
  Questions: Question [ ];
}
