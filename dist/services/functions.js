"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBook = saveBook;
exports.selectBookByCategory = selectBookByCategory;
exports.selectBookByText = selectBookByText;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
const fs_1 = __importDefault(require("fs"));
function saveBook(newBook) {
    const fileName = "src/data/bookStore.json";
    let bookStore = [];
    if (fs_1.default.existsSync(fileName)) {
        const fileContent = fs_1.default.readFileSync(fileName, { encoding: "utf8" });
        if (fileContent.trim()) {
            bookStore = JSON.parse(fileContent);
        }
    }
    bookStore.push(newBook);
    fs_1.default.writeFileSync(fileName, JSON.stringify(bookStore, null, 2), { encoding: "utf8" });
    console.log("");
    console.log("Book save successfully.");
}
function selectBookByCategory(bookCategory) {
    const fileName = "src/data/bookStore.json";
    const bookStoreBuffer = fs_1.default.readFileSync(fileName, { encoding: "utf8" });
    const bookStore = JSON.parse(bookStoreBuffer);
    const filteredBooks = bookStore.filter(b => b.category === bookCategory);
    console.log(filteredBooks);
}
function selectBookByText(text) {
    const fileName = "src/data/bookStore.json";
    const bookStoreBuffer = fs_1.default.readFileSync(fileName, { encoding: "utf8" });
    const bookStore = JSON.parse(bookStoreBuffer);
    const filteredBooks = bookStore.filter(b => b.title.toLowerCase().includes(text.toLowerCase()));
    console.log(filteredBooks);
}
function updateBook() {
    throw new Error("Function not implemented.");
}
function deleteBook() {
    throw new Error("Function not implemented.");
}
