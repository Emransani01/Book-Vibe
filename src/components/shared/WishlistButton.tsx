"use client";

import React, { useEffect, useState } from "react";
import { IBook } from "@/types/books.tpe";

interface WishlistButtonProps {
  book: IBook;
}

const WishlistButton = ({ book }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (!savedWishlist) {
      setIsWishlisted(false);
      return;
    }

    const wishlist = JSON.parse(savedWishlist) as IBook[];

    const exists = wishlist.some((item) => item.bookId === book.bookId);

    setIsWishlisted(exists);
  }, [book.bookId]);

  const showToast = (message: string, type: "success" | "remove") => {
    window.dispatchEvent(
      new CustomEvent("showToast", {
        detail: {
          message,
          type,
        },
      }),
    );
  };

  const handleWishlist = () => {
    const savedWishlist = localStorage.getItem("wishlist");

    const wishlist = savedWishlist
      ? (JSON.parse(savedWishlist) as IBook[])
      : [];

    const exists = wishlist.some((item) => item.bookId === book.bookId);

    if (exists) {
      const updatedWishlist = wishlist.filter(
        (item) => item.bookId !== book.bookId,
      );

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      setIsWishlisted(false);

      showToast(`"${book.bookName}" removed from your wishlist.`, "remove");
    } else {
      const updatedWishlist = [...wishlist, book];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      setIsWishlisted(true);

      showToast(`"${book.bookName}" added to your wishlist.`, "success");
    }

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      className={`btn flex-1 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
        isWishlisted ? "btn-secondary" : "btn-outline btn-secondary"
      }`}
    >
      {isWishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
    </button>
  );
};

export default WishlistButton;
