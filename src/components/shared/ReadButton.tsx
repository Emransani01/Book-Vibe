"use client";

import React, { useEffect, useState } from "react";
import { IBook } from "@/types/books.tpe";

interface ReadButtonProps {
  book: IBook;
}

const ReadButton = ({ book }: ReadButtonProps) => {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const readBooks = JSON.parse(
      localStorage.getItem("readBooks") || "[]",
    ) as number[];

    setIsRead(readBooks.includes(book.bookId));
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

  const handleRead = () => {
    const readBooks = JSON.parse(
      localStorage.getItem("readBooks") || "[]",
    ) as number[];

    if (isRead) {
      const updatedReadBooks = readBooks.filter((id) => id !== book.bookId);

      localStorage.setItem("readBooks", JSON.stringify(updatedReadBooks));

      setIsRead(false);

      showToast(`"${book.bookName}" removed from your read books.`, "remove");
    } else {
      const updatedReadBooks = [...readBooks, book.bookId];

      localStorage.setItem("readBooks", JSON.stringify(updatedReadBooks));

      setIsRead(true);

      showToast(`"${book.bookName}" marked as read.`, "success");
    }

    window.dispatchEvent(new Event("readBooksUpdated"));
  };

  return (
    <button
      type="button"
      onClick={handleRead}
      className={`btn flex-1 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
        isRead ? "btn-secondary" : "btn-primary"
      }`}
    >
      {isRead ? "✓ Read" : "Read"}
    </button>
  );
};

export default ReadButton;
