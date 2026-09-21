"use client";

import React, { useEffect, useState } from "react";
import BooksCard from "./shared/BookCard";
import { IBook } from "@/types/books.tpe";

interface BooksProps {
  limit?: number;
  title?: string;
}

type FilterType = "all" | "read" | "wishlist";

const Books = ({ limit, title }: BooksProps) => {
  const [booksData, setBooksData] = useState<IBook[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState("default");

  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [readBookIds, setReadBookIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  /* =========================================
     LOAD BOOKS
  ========================================= */
  useEffect(() => {
    setMounted(true);

    const getBooks = async () => {
      try {
        setLoading(true);

        const response = await fetch("/booksData.json");

        if (!response.ok) {
          throw new Error("Failed to fetch books data");
        }

        const data: IBook[] = await response.json();

        setBooksData(data);
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  /* =========================================
     LOAD SAVED BOOKS
  ========================================= */
  useEffect(() => {
    const loadSavedBooks = () => {
      const savedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]",
      ) as IBook[];

      const savedReadBooks = JSON.parse(
        localStorage.getItem("readBooks") || "[]",
      ) as number[];

      setWishlistIds(savedWishlist.map((book) => book.bookId));
      setReadBookIds(savedReadBooks);
    };

    loadSavedBooks();

    window.addEventListener("wishlistUpdated", loadSavedBooks);
    window.addEventListener("readBooksUpdated", loadSavedBooks);
    window.addEventListener("focus", loadSavedBooks);

    return () => {
      window.removeEventListener("wishlistUpdated", loadSavedBooks);
      window.removeEventListener("readBooksUpdated", loadSavedBooks);
      window.removeEventListener("focus", loadSavedBooks);
    };
  }, []);

  /* =========================================
     REMOVE BOOK
  ========================================= */
  const handleRemoveBook = (book: IBook) => {
    if (activeFilter === "wishlist") {
      const savedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]",
      ) as IBook[];

      const updatedWishlist = savedWishlist.filter(
        (item) => item.bookId !== book.bookId,
      );

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      setWishlistIds(updatedWishlist.map((item) => item.bookId));

      window.dispatchEvent(new Event("wishlistUpdated"));

      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            message: `"${book.bookName}" removed from wishlist`,
            type: "remove",
          },
        }),
      );
    }

    if (activeFilter === "read") {
      const savedReadBooks = JSON.parse(
        localStorage.getItem("readBooks") || "[]",
      ) as number[];

      const updatedReadBooks = savedReadBooks.filter(
        (id) => id !== book.bookId,
      );

      localStorage.setItem("readBooks", JSON.stringify(updatedReadBooks));

      setReadBookIds(updatedReadBooks);

      window.dispatchEvent(new Event("readBooksUpdated"));

      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            message: `"${book.bookName}" removed from read books`,
            type: "remove",
          },
        }),
      );
    }
  };

  /* =========================================
     FILTER + SORT
  ========================================= */
  let filteredBooks = [...booksData];

  const isHomePage = title === "Popular Books";

  if (!isHomePage) {
    if (activeFilter === "read") {
      filteredBooks = filteredBooks.filter((book) =>
        readBookIds.includes(book.bookId),
      );
    }

    if (activeFilter === "wishlist") {
      filteredBooks = filteredBooks.filter((book) =>
        wishlistIds.includes(book.bookId),
      );
    }

    if (sortBy === "rating") {
      filteredBooks.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "pages") {
      filteredBooks.sort((a, b) => b.totalPages - a.totalPages);
    }

    if (sortBy === "year") {
      filteredBooks.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
    }
  }

  const displayedBooks = limit ? filteredBooks.slice(0, limit) : filteredBooks;

  /* =========================================
     HOME SKELETON
  ========================================= */
  const HomeBooksSkeleton = () => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: limit || 6 }).map((_, index) => (
        <div key={index} className="rounded-2xl bg-base-200 p-4">
          <div className="animate-pulse rounded-xl bg-base-100 p-4">
            <div className="h-52 rounded-xl bg-base-300" />

            <div className="mt-4 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-base-300" />
              <div className="h-6 w-20 rounded-full bg-base-300" />
            </div>

            <div className="mt-4 h-5 w-3/4 rounded bg-base-300" />
            <div className="mt-2 h-4 w-1/2 rounded bg-base-300" />

            <div className="mt-4 h-16 rounded-xl bg-base-300" />
          </div>
        </div>
      ))}
    </div>
  );

  /* =========================================
     LIST SKELETON
  ========================================= */
  const ListedBooksSkeleton = () => (
    <div className="mt-6 space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl bg-base-200 p-4">
          <div className="flex gap-6 rounded-xl bg-base-100 p-5 md:p-6">
            <div className="h-44 w-32 shrink-0 rounded-xl bg-base-300 md:h-48 md:w-36" />

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="h-7 w-2/3 rounded bg-base-300" />

              <div className="mt-3 h-4 w-1/3 rounded bg-base-300" />

              <div className="mt-5 flex gap-2">
                <div className="h-6 w-16 rounded-full bg-base-300" />
                <div className="h-6 w-20 rounded-full bg-base-300" />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="h-16 rounded-lg bg-base-300" />
                <div className="h-16 rounded-lg bg-base-300" />
                <div className="h-16 rounded-lg bg-base-300" />
              </div>

              <div className="mt-5 h-16 rounded-xl bg-base-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  /* =========================================
     HOME PAGE
  ========================================= */
  if (isHomePage) {
    return (
      <section className="min-h-screen bg-[#fffaf3] py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* TITLE */}
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b87943]">
              Explore Collection
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#29231e] md:text-4xl">
              {title}
            </h2>

            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-[2px] w-8 rounded-full bg-[#d99a5b]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5e3c]" />
              <span className="h-[2px] w-8 rounded-full bg-[#d99a5b]" />
            </div>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#756b63] md:text-base">
              Discover beautiful books and find your next favorite story.
            </p>
          </div>

          {/* HOME BOOKS */}
          {!mounted || loading ? (
            <HomeBooksSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayedBooks.map((book) => (
                <BooksCard key={book.bookId} book={book} variant="grid" />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  /* =========================================
     LISTED BOOKS PAGE
  ========================================= */
  return (
    <section className="min-h-screen bg-[#fffaf3] py-10">
      <div className="container mx-auto px-4">
        {/* PAGE TITLE */}
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b87943]">
            Explore Collection
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#29231e] md:text-4xl">
            {title || "Books"}
          </h1>

          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-[2px] w-8 rounded-full bg-[#d99a5b]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5e3c]" />
            <span className="h-[2px] w-8 rounded-full bg-[#d99a5b]" />
          </div>

          <p className="mx-auto mt-3 max-w-xl text-sm text-[#756b63]">
            Discover books, explore new stories, and build your personal
            collection.
          </p>
        </div>

        {/* SORT */}
        <div className="mt-7 flex justify-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-sm rounded-xl border-[#eadfd2] bg-white text-[#6f472d] shadow-sm transition-all duration-300 hover:border-[#d99a5b] focus:border-[#8b5e3c] focus:outline-none"
          >
            <option value="default">Sort By</option>
            <option value="rating">Rating</option>
            <option value="pages">Pages</option>
            <option value="year">Year</option>
          </select>
        </div>

        {/* FILTER BUTTONS */}
        <div className="mt-7 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveFilter("read")}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              activeFilter === "read"
                ? "bg-[#8b5e3c] text-white shadow-md shadow-[#8b5e3c]/20 hover:-translate-y-0.5 hover:bg-[#6f472d]"
                : "border border-[#eadfd2] bg-white text-[#756b63] hover:-translate-y-0.5 hover:border-[#d99a5b] hover:bg-[#f8efe3] hover:text-[#8b5e3c]"
            }`}
          >
            Read Books
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("wishlist")}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              activeFilter === "wishlist"
                ? "bg-[#8b5e3c] text-white shadow-md shadow-[#8b5e3c]/20 hover:-translate-y-0.5 hover:bg-[#6f472d]"
                : "border border-[#eadfd2] bg-white text-[#756b63] hover:-translate-y-0.5 hover:border-[#d99a5b] hover:bg-[#f8efe3] hover:text-[#8b5e3c]"
            }`}
          >
            Wishlist Books
          </button>

          {activeFilter !== "all" && (
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="rounded-xl border border-[#eadfd2] bg-[#f8efe3] px-5 py-2.5 text-sm font-semibold text-[#6f472d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f1dfca]"
            >
              All Books
            </button>
          )}
        </div>

        {/* DIVIDER */}
        <div className="mx-auto mt-7 max-w-6xl border-b border-[#eadfd2]" />

        {/* BOOK LIST */}
        {!mounted || loading ? (
          <ListedBooksSkeleton />
        ) : (
          <div className="mt-6 space-y-4">
            {displayedBooks.length > 0 ? (
              displayedBooks.map((book) => (
                <BooksCard
                  key={book.bookId}
                  book={book}
                  variant="list"
                  showRemove={activeFilter !== "all"}
                  onRemove={() => handleRemoveBook(book)}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-[#eadfd2] bg-[#fffaf3] py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f1dfca] text-2xl">
                  📚
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#29231e]">
                  No books found
                </h2>

                <p className="mt-2 text-sm text-[#756b63]">
                  There are no books in this section yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;
