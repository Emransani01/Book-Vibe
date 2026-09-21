"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd2] bg-[#fffaf3]/95 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-[76px] px-0">
          {/* =================================
              LOGO
          ================================== */}
          <div className="navbar-start">
            <Link href="/" className="group flex items-center gap-2">
              {/* Logo Icon */}
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8b5e3c] text-lg text-white shadow-md transition duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:bg-[#6f472d]">
                📚
              </span>

              {/* Logo Text */}
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-[#29231e] transition duration-300 group-hover:text-[#8b5e3c] md:text-2xl">
                  Book Vibe
                </span>

                <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[#756b63] sm:block">
                  Read • Discover • Enjoy
                </span>
              </div>
            </Link>
          </div>

          {/* =================================
              DESKTOP NAVIGATION
          ================================== */}
          <div className="navbar-center hidden lg:flex">
            <nav className="flex items-center gap-8">
              <Link
                href="/"
                className="nav-link text-sm font-semibold text-[#756b63]"
              >
                Home
              </Link>

              <Link
                href="/books"
                className="nav-link text-sm font-semibold text-[#756b63]"
              >
                Listed Books
              </Link>

              <Link
                href="/pages-to-read"
                className="nav-link text-sm font-semibold text-[#756b63]"
              >
                Pages to Read
              </Link>
            </nav>
          </div>

          {/* =================================
              DESKTOP AUTH BUTTONS
          ================================== */}
          <div className="navbar-end hidden gap-3 lg:flex">
            <Link
              href="/signin"
              className="rounded-xl border border-[#d9c7b5] bg-white px-5 py-2.5 text-sm font-semibold text-[#6f472d] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5e3c] hover:bg-[#f8efe3] hover:shadow-md"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-[#8b5e3c] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#6f472d] hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* =================================
              MOBILE MENU
          ================================== */}
          <div className="navbar-end lg:hidden">
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                aria-label="Open navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfd2] bg-white text-xl text-[#6f472d] shadow-sm transition duration-300 hover:border-[#c9a889] hover:bg-[#f8efe3] hover:shadow-md"
              >
                ☰
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[50] mt-3 w-64 rounded-2xl border border-[#eadfd2] bg-[#fffaf3] p-3 shadow-xl"
              >
                {/* Mobile Navigation */}
                <li>
                  <Link
                    href="/"
                    className="rounded-xl px-4 py-3 font-medium text-[#756b63] hover:bg-[#f8efe3] hover:text-[#8b5e3c]"
                  >
                    🏠 Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/books"
                    className="rounded-xl px-4 py-3 font-medium text-[#756b63] hover:bg-[#f8efe3] hover:text-[#8b5e3c]"
                  >
                    📚 Listed Books
                  </Link>
                </li>

                <li>
                  <Link
                    href="/pages-to-read"
                    className="rounded-xl px-4 py-3 font-medium text-[#756b63] hover:bg-[#f8efe3] hover:text-[#8b5e3c]"
                  >
                    📊 Pages to Read
                  </Link>
                </li>

                {/* Divider */}
                <li className="my-2 border-t border-[#eadfd2]" />

                {/* Auth Buttons */}
                <li>
                  <Link
                    href="/signin"
                    className="rounded-xl px-4 py-3 font-semibold text-[#6f472d] hover:bg-[#f8efe3]"
                  >
                    Sign In
                  </Link>
                </li>

                <li>
                  <Link
                    href="/signup"
                    className="rounded-xl bg-[#8b5e3c] px-4 py-3 font-semibold text-white hover:bg-[#6f472d]"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
