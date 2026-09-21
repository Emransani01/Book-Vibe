# 📚 Book-Vibe

Book-Vibe is a modern and responsive book discovery web application where users can explore books, view detailed information, manage their wishlist, track books they have read, and organize their personal book collection.

The project focuses on a clean reading-friendly UI, responsive design, smooth interactions, and a simple user experience.

---

## ✨ Features

### 📖 Book Collection
- Browse a collection of books
- View books in a clean grid layout
- View books in a detailed list layout
- View detailed information for individual books

### 🔍 Book Filtering
Users can filter their personal collection by:
- All Books
- Read Books
- Wishlist Books

### ↕️ Book Sorting
Books can be sorted by:
- Rating
- Number of Pages
- Publishing Year

### ❤️ Wishlist
Users can add books to their wishlist.

Wishlist data is stored in the browser using `localStorage`.

Users can also remove books from their wishlist directly from the **Wishlist Books** section.

### 📚 Read Books
Users can mark books as read.

Read-book data is stored using `localStorage`.

Users can remove books from the **Read Books** section without deleting the original book data.

### 🔔 Toast Notifications
The application provides toast notifications when users:
- Add a book to wishlist
- Remove a book from wishlist
- Mark a book as read
- Remove a book from read books

### ⏳ Loading Skeleton
The application includes loading skeletons while book data is being loaded.

Separate skeleton layouts are used for:
- Home page book cards
- Listed book cards

### ❌ Custom 404 Page
A custom styled 404 page is included with:
- Book-themed design
- Back to Home button
- Browse Books button
- Responsive layout

### 📱 Responsive Design
The application is designed to work across:
- Mobile devices
- Tablets
- Laptops
- Desktop screens

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript

### Styling
- Tailwind CSS
- DaisyUI

### Data
- JSON book data
- Browser `localStorage`

---

## 📂 Project Structure

```text
book-vibe/
│
├── app/
│   ├── books/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── shared/
│   │   ├── BookCard.tsx
│   │   ├── WishlistButton.tsx
│   │   ├── ReadButton.tsx
│   │   └── Toast.tsx
│   ├── Books.tsx
│   ├── Navbar.tsx
│   └── Banner.tsx
│
├── public/
│   └── booksData.json
│
├── types/
│   └── books.tpe.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Go to the project directory

```bash
cd book-vibe
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📦 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Start

```bash
npm run start
```

Starts the production server.

### Lint

```bash
npm run lint
```

Checks the project for linting issues.

---

## 💾 Local Storage

Book-Vibe uses browser `localStorage` to save user-specific book preferences.

### Wishlist

```text
wishlist
```

### Read Books

```text
readBooks
```

The original book data in `/public/booksData.json` is never modified when a user removes a book from their wishlist or read list.

---

## 📚 Book Data

The application's book collection is loaded from:

```text
/public/booksData.json
```

Each book contains information such as:

```text
bookId
bookName
author
image
tags
category
rating
publisher
yearOfPublishing
totalPages
```

---

## 🎯 User Experience

The application is designed around a simple flow:

```text
Browse Books
     ↓
View Book Details
     ↓
Add to Wishlist / Mark as Read
     ↓
Manage Personal Collection
     ↓
Remove from Wishlist / Read Books
```

Removing a book from a personal collection does not remove it from the main book collection.

---

## 🎨 UI Highlights

Book-Vibe uses a warm, book-inspired visual style with:
- Soft beige backgrounds
- Brown accent colors
- Rounded cards
- Subtle shadows
- Smooth hover animations
- Responsive layouts
- Loading skeletons
- Toast notifications

---

## 🔮 Future Improvements

Possible future improvements include:
- 🔎 Book search functionality
- 📑 Pagination
- 🌓 Dark mode
- 📊 Reading statistics
- ⭐ Personal book ratings
- 📝 Reading notes
- 👤 User authentication
- ☁️ Cloud-based wishlist synchronization
- 📚 Reading progress tracking
- 🔖 Book bookmarking
- 🔍 Advanced filtering by category and author

---

## 🤝 Contributing

Contributions are welcome.

If you would like to improve the project:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

## 📄 License

This project is created for learning and development purposes.

---

## 👨‍💻 Author

**Your Name**

Built with ❤️ and ☕ using Next.js, React, TypeScript, Tailwind CSS, and DaisyUI.

---

## ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.
