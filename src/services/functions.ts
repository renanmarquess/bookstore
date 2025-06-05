import { Book, BookCategory } from "models/Book";
import fs from "fs"

export function saveBook(newBook: Book) {
    const fileName = "src/data/bookStore.json";

    let bookStore: Book[] = [];

    if (fs.existsSync(fileName)) {
        const fileContent = fs.readFileSync(fileName, { encoding: "utf8" });

        if (fileContent.trim()) {
            bookStore = JSON.parse(fileContent) as Book[];
        }
    }

    bookStore.push(newBook);

    fs.writeFileSync(fileName, JSON.stringify(bookStore, null, 2), { encoding: "utf8" });

    console.log("")
    console.log("Book save successfully.");
}

export function selectBookByCategory(bookCategory: BookCategory) {
    const fileName = "src/data/bookStore.json";
    const bookStoreBuffer = fs.readFileSync(fileName, { encoding: "utf8" })
    const bookStore = JSON.parse(bookStoreBuffer) as Book[];

    const filteredBooks: Book[] = bookStore.filter(b => b.category === bookCategory);

    console.log(filteredBooks)


}

export function selectBookByText(text: string) {
    const fileName = "src/data/bookStore.json";
    const bookStoreBuffer = fs.readFileSync(fileName, { encoding: "utf8" })
    const bookStore = JSON.parse(bookStoreBuffer) as Book[];

    const filteredBooks: Book[] = bookStore.filter(b => b.title.toLowerCase().includes(text.toLowerCase())
    );

    console.log(filteredBooks)

}

export function updateBook() {
    throw new Error("Function not implemented.");
}

export function deleteBook() {
    throw new Error("Function not implemented.");
}

export { }
