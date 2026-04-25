export interface Professor {
    department: string,
    office: string,
    professor: string,
    title: string,
};

export interface Forms {
    name: string | undefined,
    classYear: string | undefined,
    department: string | undefined,
    courseCode: string,
    professorName: string | undefined,
    grade: string | undefined,
    rating: number,
    difficulty: number,
    wouldTake: string | undefined,
    review: string | undefined,
    date: Date | undefined
};