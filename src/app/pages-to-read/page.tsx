"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IBook } from "@/types/books.tpe";

const PagesToReadPage = () => {
  const [readBooks, setReadBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const loadReadBooks = async () => {
      try {
        const response = await fetch("/booksData.json");

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const books: IBook[] = await response.json();

        const savedReadIds = JSON.parse(
          localStorage.getItem("readBooks") || "[]",
        ) as number[];

        const selectedBooks = books.filter((book) =>
          savedReadIds.includes(book.bookId),
        );

        setReadBooks(selectedBooks);
      } catch (error) {
        console.error("Failed to load read books:", error);
      }
    };

    loadReadBooks();

    const handleReadUpdate = () => {
      loadReadBooks();
    };

    window.addEventListener("readBooksUpdated", handleReadUpdate);
    window.addEventListener("focus", handleReadUpdate);

    return () => {
      window.removeEventListener("readBooksUpdated", handleReadUpdate);
      window.removeEventListener("focus", handleReadUpdate);
    };
  }, []);

  const totalPages = readBooks.reduce(
    (total, book) => total + book.totalPages,
    0,
  );

  const maxPages =
    readBooks.length > 0
      ? Math.max(...readBooks.map((book) => book.totalPages))
      : 1;

  return (
    <main className="min-h-screen bg-base-100">
      <section className="container mx-auto px-4 py-12">
        {/* =========================
            PAGE HEADER
        ========================== */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Reading Tracker
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Pages to Read
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-base-content/60 md:text-base">
            Keep track of the books you have read and explore your reading
            progress.
          </p>
        </div>

        {/* =========================
            STATS
        ========================== */}
        <div className="mx-auto mb-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Read Books */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_15px_35px_rgba(217,154,91,0.16)]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl">
              📚
            </div>

            <p className="mt-4 text-sm font-medium text-base-content/60">
              Read Books
            </p>

            <p className="mt-1 text-3xl font-bold text-primary">
              {readBooks.length}
            </p>
          </div>

          {/* Total Pages */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_15px_35px_rgba(217,154,91,0.16)]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl">
              📖
            </div>

            <p className="mt-4 text-sm font-medium text-base-content/60">
              Total Pages
            </p>

            <p className="mt-1 text-3xl font-bold text-primary">{totalPages}</p>
          </div>
        </div>

        {/* =========================
            CUSTOM READING CHART
        ========================== */}
        {readBooks.length > 0 ? (
          <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
            {/* Chart Header */}
            <div className="border-b border-base-300 px-6 py-6 md:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Your Library
                  </p>

                  <h2 className="mt-1 text-xl font-bold md:text-2xl">
                    Reading Progress
                  </h2>

                  <p className="mt-1 text-sm text-base-content/60">
                    A visual look at the pages in each book.
                  </p>
                </div>

                <div className="w-fit rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                  {totalPages} Total Pages
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="p-6 md:p-10">
              <div className="overflow-x-auto pb-4">
                <div className="flex min-w-[700px] items-end gap-5 px-3 pt-8">
                  {readBooks.map((book) => {
                    const barHeight = Math.max(
                      90,
                      (book.totalPages / maxPages) * 300,
                    );

                    const progressPercent = Math.round(
                      (book.totalPages / maxPages) * 100,
                    );

                    return (
                      <div
                        key={book.bookId}
                        className="group flex min-w-[95px] flex-1 flex-col items-center"
                      >
                        {/* Page Number */}
                        <div className="mb-3 rounded-full border border-[#eadfd2] bg-white px-3 py-1.5 text-xs font-bold text-[#8b5e3c] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(217,154,91,0.18)]">
                          {book.totalPages} pages
                        </div>

                        {/* Custom Bar Wrapper */}
                        <div
                          className="relative flex w-full max-w-[82px] items-end justify-center"
                          style={{
                            height: "330px",
                          }}
                        >
                          {/* Background Track */}
                          <div className="absolute bottom-0 h-full w-[54px] rounded-[28px] bg-[#f8efe3]" />

                          {/* Main Custom Bar */}
                          <div
                            className="relative z-10 w-[54px] overflow-hidden rounded-[28px] bg-[#8b5e3c] shadow-[0_12px_28px_rgba(217,154,91,0.20)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_35px_rgba(217,154,91,0.30)]"
                            style={{
                              height: `${barHeight}px`,
                            }}
                          >
                            {/* Inner Highlight */}
                            <div className="absolute left-2 top-3 h-16 w-2 rounded-full bg-white/20" />

                            {/* Decorative Shape */}
                            <div className="absolute -right-5 top-6 h-14 w-14 rounded-full bg-white/10" />

                            {/* Bottom Shine */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/5" />
                          </div>

                          {/* Top Floating Dot */}
                          <div
                            className="absolute z-20 h-5 w-5 rounded-full border-4 border-white bg-[#d99a5b] shadow-md transition-all duration-500 group-hover:scale-125"
                            style={{
                              bottom: `${barHeight - 8}px`,
                            }}
                          />

                          {/* Page Percentage */}
                          <span
                            className="absolute z-20 text-[10px] font-bold text-white"
                            style={{
                              bottom: `${Math.max(18, barHeight / 2 - 5)}px`,
                            }}
                          >
                            {progressPercent}%
                          </span>
                        </div>

                        {/* Book Label */}
                        <div className="mt-5 text-center">
                          <p
                            className="line-clamp-2 w-28 text-xs font-bold leading-5 text-base-content/80 transition-colors duration-300 group-hover:text-primary"
                            title={book.bookName}
                          >
                            {book.bookName}
                          </p>

                          <p className="mt-1 text-[10px] text-base-content/50">
                            {book.totalPages} pages
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart Legend */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-base-300 pt-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#8b5e3c]" />

                  <span className="text-xs font-medium text-base-content/60">
                    Pages read
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#f8efe3]" />

                  <span className="text-xs font-medium text-base-content/60">
                    Remaining scale
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="border-t border-base-300 bg-base-200/50 px-6 py-4 text-center">
              <p className="text-xs text-base-content/60">
                Your reading progress updates automatically when you mark a book
                as read.
              </p>
            </div>
          </div>
        ) : (
          /* =========================
             EMPTY STATE
          ========================== */
          <div className="mx-auto max-w-2xl rounded-3xl border border-base-300 bg-base-100 px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
              📚
            </div>

            <h2 className="mt-6 text-2xl font-bold">No Read Books Yet</h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-base-content/60">
              Mark some books as read and your reading progress will appear
              here.
            </p>

            <Link
              href="/books"
              className="btn btn-primary mt-7 rounded-xl px-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              Explore Books
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default PagesToReadPage;
