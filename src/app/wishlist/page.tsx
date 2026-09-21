"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IBook } from "@/types/books.tpe";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<IBook[]>([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]",
    ) as IBook[];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (bookId: number) => {
    const updatedWishlist = wishlist.filter((book) => book.bookId !== bookId);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          My Collection
        </p>

        <h1 className="text-3xl font-bold md:text-4xl">My Wishlist</h1>

        <p className="mx-auto mt-2 max-w-2xl text-base-content/60">
          Books you have saved for later.
        </p>
      </div>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 px-6 py-16 text-center shadow-sm">
          <div className="text-5xl">📚</div>

          <h2 className="mt-4 text-2xl font-bold">Your Wishlist is Empty</h2>

          <p className="mt-2 text-base-content/60">
            Add some books to your wishlist and they will appear here.
          </p>

          <Link href="/books" className="btn btn-primary mt-6 rounded-xl">
            Explore Books
          </Link>
        </div>
      ) : (
        <>
          {/* Wishlist Count */}
          <div className="mb-6">
            <p className="font-medium">
              {wishlist.length} {wishlist.length === 1 ? "book" : "books"} saved
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((book) => (
              <div
                key={book.bookId}
                className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm"
              >
                {/* Image */}
                <div className="relative h-72 bg-base-200">
                  <Image
                    src={book.image}
                    alt={book.bookName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="text-xl font-bold">{book.bookName}</h2>

                    <p className="mt-1 text-sm text-base-content/60">
                      by {book.author}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>⭐ {book.rating}</span>

                    <span>{book.totalPages} pages</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/books/${book.bookId}`}
                      className="btn btn-primary flex-1 rounded-xl"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(book.bookId)}
                      className="btn btn-outline btn-error rounded-xl"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default WishlistPage;
