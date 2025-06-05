"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operations = exports.BookCategory = exports.Book = void 0;
class Book {
    title = "";
    summary = "";
    year = 0;
    pages = 0;
    isbn = ""; //10 a 13 dígitos
    category = BookCategory.Other;
}
exports.Book = Book;
var BookCategory;
(function (BookCategory) {
    BookCategory[BookCategory["Romance"] = 0] = "Romance";
    BookCategory[BookCategory["Fantasy"] = 1] = "Fantasy";
    BookCategory[BookCategory["SciFi"] = 2] = "SciFi";
    BookCategory[BookCategory["Biography"] = 3] = "Biography";
    BookCategory[BookCategory["History"] = 4] = "History";
    BookCategory[BookCategory["Technology"] = 5] = "Technology";
    BookCategory[BookCategory["Other"] = 6] = "Other";
})(BookCategory || (exports.BookCategory = BookCategory = {}));
var Operations;
(function (Operations) {
    Operations[Operations["Create"] = 0] = "Create";
    Operations[Operations["Select"] = 1] = "Select";
    Operations[Operations["Update"] = 2] = "Update";
    Operations[Operations["Delete"] = 3] = "Delete";
})(Operations || (exports.Operations = Operations = {}));
