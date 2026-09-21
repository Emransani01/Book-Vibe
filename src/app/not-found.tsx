import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-[#fffaf3] px-4 py-16">
      <div className="relative w-full max-w-3xl text-center">
        {/* Decorative background circles */}
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#f1dfca]/60 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#eadfd2]/70 blur-3xl" />

        {/* Main Card */}
        <div className="relative rounded-3xl border border-[#eadfd2] bg-white/80 px-6 py-12 shadow-xl shadow-[#8b5e3c]/10 backdrop-blur-sm sm:px-10 md:px-16">
          {/* Book Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#f8efe3] shadow-inner">
            <div className="text-5xl">📖</div>
          </div>

          {/* 404 */}
          <div className="mt-8">
            <h1 className="text-7xl font-black tracking-tight text-[#8b5e3c] sm:text-8xl md:text-9xl">
              404
            </h1>

            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-[2px] w-10 rounded-full bg-[#d99a5b]" />
              <span className="h-2 w-2 rounded-full bg-[#8b5e3c]" />
              <span className="h-[2px] w-10 rounded-full bg-[#d99a5b]" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-2xl font-extrabold text-[#29231e] sm:text-3xl">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#756b63] sm:text-base">
            Looks like this page has wandered off the bookshelf.
            The page you are looking for may have been moved,
            removed, or never existed.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="w-full rounded-xl bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#8b5e3c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6f472d] hover:shadow-lg sm:w-auto"
            >
              ← Back to Home
            </Link>

            <Link
              href="/books"
              className="w-full rounded-xl border border-[#eadfd2] bg-[#f8efe3] px-6 py-3 text-sm font-semibold text-[#6f472d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d99a5b] hover:bg-[#f1dfca] sm:w-auto"
            >
              Browse Books →
            </Link>
          </div>

          {/* Small footer text */}
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-[#b87943]">
            Book-Vibe • Keep Reading
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;