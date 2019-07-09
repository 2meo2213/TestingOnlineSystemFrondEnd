export interface Question {
    Id: string;
    Category: {
        Id: string;
        Name: string;
    };
    CategoryId: string;
    Content: string;
    CreatedBy: string;
    UpdatedBy: string;
    UpdatedDate: string;
    CreatedDate: string;
    Level: string;
    QuestionType: string;
    Tags: [{ Id: string; Name: string }]
    TagsId: string;
    Status: string;
    Answers: [
        {
            Id: string,
            Content: string;
            Media: string;
            Status: 1;
            IsTrue: boolean;
            CreatedBy: string;
            CreatedDate: string;
            UpdatedBy: string;
            UpdatedDate: string;
        }
    ];


}
