const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

jest.setTimeout(30000);

const initialBooks = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "9780201616224",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
  },
];

const booksInDb = async () => {
  const books = await Book.find({});
  return books.map((book) => book.toJSON());
};

describe("Book Routes", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connection.asPromise();
    await User.deleteMany({});

    const signupResponse = await request(app).post("/api/users/signup").send({
      name: "Book Tester",
      email: "booktester@example.com",
      password: "secret123",
    });

    token = signupResponse.body.token;
  });

  beforeEach(async () => {
    await Book.deleteMany({});

    for (const book of initialBooks) {
      await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${token}`)
        .send(book)
        .expect(201);
    }
  });

  describe("GET /api/books", () => {
    test("returns all books without authentication", async () => {
      const response = await request(app).get("/api/books").expect(200);

      expect(response.body).toHaveLength(initialBooks.length);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/books/:bookId", () => {
    test("returns a single book by id without authentication", async () => {
      const books = await booksInDb();
      const bookToView = books[0];

      const response = await request(app)
        .get(`/api/books/${bookToView.id}`)
        .expect(200);

      expect(response.body.id).toBe(bookToView.id);
      expect(response.body.title).toBe(bookToView.title);
    });

    test("returns 404 for invalid id", async () => {
      await request(app).get("/api/books/not-a-valid-id").expect(404);
    });
  });

  describe("POST /api/books", () => {
    describe("when the user is authenticated", () => {
      test("creates a new book", async () => {
        const newBook = {
          title: "Refactoring",
          author: "Martin Fowler",
          isbn: "9780201485677",
        };

        await request(app)
          .post("/api/books")
          .set("Authorization", `Bearer ${token}`)
          .send(newBook)
          .expect(201);

        const books = await booksInDb();
        expect(books).toHaveLength(initialBooks.length + 1);
        expect(books.map((book) => book.title)).toContain(newBook.title);
      });
    });

    describe("when the user is not authenticated", () => {
      test("returns 401", async () => {
        const newBook = {
          title: "Domain-Driven Design",
          author: "Eric Evans",
          isbn: "9780321125217",
        };

        await request(app).post("/api/books").send(newBook).expect(401);
      });
    });
  });

  describe("PUT /api/books/:bookId", () => {
    describe("when the user is authenticated", () => {
      test("updates an existing book", async () => {
        const books = await booksInDb();
        const bookToUpdate = books[0];
        const updates = { title: "Clean Code (2nd Edition)" };

        const response = await request(app)
          .put(`/api/books/${bookToUpdate.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send(updates)
          .expect(200);

        expect(response.body.id).toBe(bookToUpdate.id);
        expect(response.body.title).toBe(updates.title);
      });

      test("returns 404 for invalid id", async () => {
        await request(app)
          .put("/api/books/not-a-valid-id")
          .set("Authorization", `Bearer ${token}`)
          .send({ title: "New Title" })
          .expect(404);
      });
    });

    describe("when the user is not authenticated", () => {
      test("returns 401", async () => {
        const books = await booksInDb();
        const bookToUpdate = books[0];

        await request(app)
          .put(`/api/books/${bookToUpdate.id}`)
          .send({ title: "Unauthorized Update" })
          .expect(401);
      });
    });
  });

  describe("DELETE /api/books/:bookId", () => {
    describe("when the user is authenticated", () => {
      test("deletes an existing book", async () => {
        const books = await booksInDb();
        const bookToDelete = books[0];

        await request(app)
          .delete(`/api/books/${bookToDelete.id}`)
          .set("Authorization", `Bearer ${token}`)
          .expect(204);

        const remainingBooks = await booksInDb();
        expect(remainingBooks).toHaveLength(initialBooks.length - 1);
      });

      test("returns 404 for invalid id", async () => {
        await request(app)
          .delete("/api/books/not-a-valid-id")
          .set("Authorization", `Bearer ${token}`)
          .expect(404);
      });
    });

    describe("when the user is not authenticated", () => {
      test("returns 401", async () => {
        const books = await booksInDb();
        const bookToDelete = books[0];

        await request(app).delete(`/api/books/${bookToDelete.id}`).expect(401);
      });
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
