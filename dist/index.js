"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./services/functions");
const Book_1 = require("./models/Book");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
let operationOption = 0;
function initializeMenu() {
    console.log(`
Choose an operation option:
  1 - Register a new book
  2 - Search for a book
  3 - Update a book
  4 - Delete a book
  5 - Exit`);
    console.log("");
    operationOption = Number(prompt("Selected an option: ")) - 1;
    if (operationOption < 0 && operationOption > 5) {
        process.exit();
    }
    switch (operationOption) {
        case Book_1.Operations.Create:
            createBook();
            break;
        case Book_1.Operations.Select:
            getBookSearchFilters();
            break;
        case Book_1.Operations.Update:
            (0, functions_1.updateBook)();
            break;
        case Book_1.Operations.Delete:
            (0, functions_1.deleteBook)();
            break;
        default:
            process.exit();
    }
}
initializeMenu();
function getBookProps() {
    console.log("");
    const title = prompt(`Enter the title: `);
    const summary = prompt(`Enter the summary: `);
    const year = Number(prompt(`Enter the year: `));
    const pages = Number(prompt(`Enter the number pages: `));
    const isbn = prompt(`Enter the isbn code: `);
    console.log("Choose the category:");
    console.log('Romance: 1, Fantasy: 2, SciFi: 3, Biography: 4, History: 5, Technology: 6, Other: 7:');
    const category = Number(prompt(`Enter the category: `)) - 1;
    const newBook = {
        title: title,
        summary: summary,
        year: year,
        pages: pages,
        isbn: isbn,
        category: category
    };
    validateProps(newBook);
    return newBook;
}
function getBookSearchFilters() {
    let selectOption;
    do {
        console.log("");
        console.log("Do you want search by text (1) or category (2)?");
        selectOption = Number(prompt("Enter an option: "));
    } while (selectOption < 1 && selectOption > 2);
    if (selectOption == 1) { //text
        console.log("");
        console.log("Enter a text to find a title: ");
        const text = prompt("Enter a text: ");
        (0, functions_1.selectBookByText)(text);
        initializeMenu();
    }
    if (selectOption == 2) { //category
        console.log("");
        console.log("Choose the category:");
        console.log('Romance: 1, Fantasy: 2, SciFi: 3, Biography: 4, History: 5, Technology: 6, Other: 7:');
        const category = Number(prompt(`Enter the category: `)) - 1;
        (0, functions_1.selectBookByCategory)(category);
        initializeMenu();
    }
}
function createBook() {
    const newBook = getBookProps();
    (0, functions_1.saveBook)(newBook);
    initializeMenu();
}
function validateProps(newBook) {
    const yearIsInvalid = newBook.year <= 0;
    const pageIsInvalid = newBook.pages <= 0;
    const categoryIsInvalid = newBook.category < 0;
    const isbnIsInvalid = !newBook.isbn || newBook.isbn.trim() === "";
    const titleIsInvalid = !newBook.title || newBook.title.trim() === "";
    const summaryIsInvalid = !newBook.summary || newBook.summary.trim() === "";
    if (yearIsInvalid || pageIsInvalid || categoryIsInvalid ||
        isbnIsInvalid || titleIsInvalid || summaryIsInvalid) {
        console.log("");
        console.log("The year, page number, and category must be valid values.");
        console.log("The fields title, summary, and ISBN are required.");
        console.log("Please create a new register again.");
        initializeMenu();
    }
}
