import { Book, BookCategory } from "models/Book";
import fs from "fs";

const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.PGHOST,
  port: 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: true,
});

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

  fs.writeFileSync(fileName, JSON.stringify(bookStore, null, 2), {
    encoding: "utf8",
  });

  console.log("");
  console.log("Book save successfully.");
}

// export function selectBookByCategory(bookCategory: BookCategory) {
//     const fileName = "src/data/bookStore.json";
//     const bookStoreBuffer = fs.readFileSync(fileName, { encoding: "utf8" })
//     const bookStore = JSON.parse(bookStoreBuffer) as Book[];

//     const filteredBooks: Book[] = bookStore.filter(b => b.category === bookCategory);

//     console.log(filteredBooks)
// }

export async function selectBookByCategory(bookCategory: number) {
  try {
    await client.connect();

    console.log("selectBookByCategory.........")
    const query = "SELECT * FROM bookstore.livros WHERE categoria_id = $1";
    const values = [bookCategory];

    console.log(query)
    console.log(values)

    const res = await client.query(query, values);
    

    console.log("client.query.........")

    if (res.rows.length === 0) {
      console.log("Nenhum produto encontrado.");
    } else {
      console.log("Produto(s) encontrado(s):", res.rows);
    }

  } catch (err) {
    console.log(`Erro ao fazer busca por categoria.`, err);
    console.error(`Erro ao fazer busca por categoria.`, err);
  } finally {
    await client.end();
    console.log("Conexão encerrada.");
  }
}

export function selectBookByText(text: string) {
  const fileName = "src/data/bookStore.json";
  const bookStoreBuffer = fs.readFileSync(fileName, { encoding: "utf8" });
  const bookStore = JSON.parse(bookStoreBuffer) as Book[];

  const filteredBooks: Book[] = bookStore.filter((b) =>
    b.title.toLowerCase().includes(text.toLowerCase())
  );

  console.log(filteredBooks);
}

export function updateBook() {
  throw new Error("Function not implemented.");
}

export function deleteBook() {
  throw new Error("Function not implemented.");
}

export {};
