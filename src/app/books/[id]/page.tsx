import React from "react";
import fs from "fs/promises";
import path from "path";
import { IBook } from "@/types/books.tpe";
import Image from "next/image";
import WishlistButton from "@/components/shared/WishlistButton";
import ReadButton from "@/components/shared/ReadButton";

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getBook = async (id: string): Promise<IBook | undefined> => {
  const filePath = path.join(process.cwd(), "public", "booksData.json");
  const file = await fs.readFile(filePath, "utf-8");

  const books: IBook[] = JSON.parse(file);

  return books.find((book) => book.bookId === Number(id));
};

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;

  const book = await getBook(id);

  if (!book) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Book Not Found</h1>

        <p className="mt-2 text-base-content/60">
          The book you are looking for does not exist.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-lg">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          {/* Book Image */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-2xl bg-base-200 shadow-md">
              <Image
                src={book.image}
                alt={book.bookName}
                width={400}
                height={550}
                className="h-auto max-h-[550px] w-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {book.category}
            </span>

            {/* Book Name */}
            <h1 className="mt-5 text-3xl font-bold md:text-4xl">
              {book.bookName}
            </h1>

            {/* Author */}
            <p className="mt-2 text-lg text-base-content/60">
              by {book.author}
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
              <span className="text-lg font-semibold">Rating:</span>

              <span className="text-lg">⭐ {book.rating}</span>
            </div>

            {/* Book Information */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-base-200 p-5">
              <div>
                <p className="text-sm text-base-content/50">Pages</p>
                <p className="mt-1 font-semibold">{book.totalPages}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">Publisher</p>
                <p className="mt-1 font-semibold">{book.publisher}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">Published Year</p>
                <p className="mt-1 font-semibold">{book.yearOfPublishing}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">Category</p>
                <p className="mt-1 font-semibold">{book.category}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ReadButton book={book} />
              <WishlistButton book={book} />
            </div>
          </div>
        </div>

        {/* Review */}
        <div
          id="review"
          className="border-t border-base-300 px-6 py-8 md:px-10"
        >
          <h2 className="text-2xl font-bold">Book Review</h2>

          <p className="mt-4 leading-7 text-base-content/70">{book.review}</p>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;
