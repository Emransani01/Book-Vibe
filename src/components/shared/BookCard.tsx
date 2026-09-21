import Image from "next/image";
import React from "react";
import { IBook } from "@/types/books.tpe";
import Link from "next/link";

interface IBookCardProps {
  book: IBook;
  variant?: "grid" | "list";
  showRemove?: boolean;
  onRemove?: () => void;
}

const BooksCard = ({
  book,
  variant = "grid",
  showRemove = false,
  onRemove,
}: IBookCardProps) => {
  if (!book) {
    return null;
  }

  /* =================================
     LIST CARD
  ================================== */
  if (variant === "list") {
    return (
      <div className="rounded-2xl bg-base-200 p-4">
        <div className="group relative flex gap-6 rounded-xl bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(217,154,91,0.22)] md:p-6">
          {/* REMOVE BUTTON */}
          {showRemove && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${book.bookName}`}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-base-300 bg-base-100 text-lg font-bold text-base-content/60 shadow-sm transition-all duration-200 hover:bg-error hover:text-white hover:shadow-md"
            >
              ×
            </button>
          )}

          {/* BOOK IMAGE */}
          <div className="flex h-44 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-base-200 p-3 md:h-48 md:w-36">
            <Image
              src={book.image}
              alt={book.bookName}
              width={130}
              height={180}
              className="h-full w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* BOOK CONTENT */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div>
              <h2 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-base-content transition-colors duration-300 group-hover:text-primary md:text-2xl">
                {book.bookName}
              </h2>

              <p className="mt-2 text-sm font-medium text-base-content/60">
                By <span className="text-base-content/80">{book.author}</span>
              </p>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* BOOK INFORMATION */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-base-200/70 px-3 py-2.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-base-content/50">
                  Published
                </p>

                <p className="mt-1 text-sm font-semibold text-base-content">
                  {book.yearOfPublishing}
                </p>
              </div>

              <div className="rounded-lg bg-base-200/70 px-3 py-2.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-base-content/50">
                  Publisher
                </p>

                <p className="mt-1 line-clamp-1 text-sm font-semibold text-base-content">
                  {book.publisher}
                </p>
              </div>

              <div className="rounded-lg bg-base-200/70 px-3 py-2.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-base-content/50">
                  Pages
                </p>

                <p className="mt-1 text-sm font-semibold text-base-content">
                  {book.totalPages}
                </p>
              </div>
            </div>

            {/* BOTTOM INFORMATION */}
            <div className="mt-auto pt-5">
              <div className="flex flex-col gap-4 rounded-xl bg-base-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-base-content/50">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-semibold text-base-content">
                      {book.category}
                    </p>
                  </div>

                  <div className="hidden h-8 w-px bg-base-300 sm:block" />

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-base-content/50">
                      Rating
                    </p>

                    <p className="mt-1 text-sm font-semibold text-base-content">
                      ⭐ {book.rating}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/books/${book.bookId}`}
                  className="btn btn-primary rounded-lg px-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =================================
     GRID CARD
  ================================== */
  return (
    <div className="rounded-2xl bg-base-200 p-4">
      <div className="group rounded-xl bg-base-100 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(217,154,91,0.22)]">
        {/* BOOK IMAGE */}
        <div className="flex h-52 items-center justify-center overflow-hidden rounded-xl bg-base-200 p-4">
          <Image
            src={book.image}
            alt={book.bookName}
            width={180}
            height={230}
            className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Book Name */}
        <h2 className="mt-3 line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug tracking-tight text-base-content transition-colors duration-300 group-hover:text-primary">
          {book.bookName}
        </h2>

        {/* Author */}
        <p className="mt-1.5 text-xs font-medium text-base-content/60">
          By <span className="text-base-content/80">{book.author}</span>
        </p>

        {/* BOTTOM INFORMATION */}
        <div className="mt-4 rounded-xl bg-base-200 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-base-content/50">
                  Category
                </p>

                <p className="mt-0.5 truncate text-xs font-semibold text-base-content">
                  {book.category}
                </p>
              </div>

              <div className="h-7 w-px shrink-0 bg-base-300" />

              <div className="shrink-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-base-content/50">
                  Rating
                </p>

                <p className="mt-0.5 text-xs font-semibold text-base-content">
                  ⭐ {book.rating}
                </p>
              </div>
            </div>

            <Link
              href={`/books/${book.bookId}`}
              className="btn btn-sm btn-primary shrink-0 rounded-lg px-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
