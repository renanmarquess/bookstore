export class Book {
    title: string = "";
    summary: string = "";
    year: number = 0;
    pages: number = 0;
    isbn: string = ""; //10 a 13 dígitos
    category: BookCategory = BookCategory.Other;
}

export enum BookCategory {
    Romance,
    Fantasy,
    SciFi,
    Biography,
    History,
    Technology,
    Other,
}

export enum Operations {
    Create,
    Select,
    Update,
    Delete
}