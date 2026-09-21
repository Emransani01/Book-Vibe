import Image from "next/image";
import Link from "next/link";
import React from "react";
import BannerImg from "@/assets/hero_img.jpg";

const Banner = () => {
  return (
    <section className="relative overflow-hidden py-8 md:py-12 lg:py-16">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#f1dfca]/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#f8e7d2]/70 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="banner-hover group relative overflow-hidden rounded-[2rem] border border-[#eadfd2] bg-gradient-to-br from-[#f8efe3] via-[#fffaf3] to-[#f1dfca] p-6 shadow-[0_15px_45px_rgba(217,154,91,0.16)] md:p-10 lg:p-14">
          {/* Decorative Circle */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border-[35px] border-white/40" />

          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-14">
            {/* =================================
                CONTENT
            ================================== */}
            <div className="relative z-10 text-center md:text-left">
              {/* Small Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#eadfd2] bg-white/80 px-4 py-2 text-sm font-semibold text-[#6f472d] shadow-sm backdrop-blur-sm">
                <span>📚</span>

                <span>Discover Your Next Read</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#29231e] sm:text-5xl md:text-5xl lg:text-6xl">
                Books to
                <br />
                <span className="text-[#8b5e3c] transition-colors duration-300 group-hover:text-[#6f472d]">
                  freshen up
                </span>
                <br />
                your bookshelf
              </h1>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#756b63] md:mx-0 md:text-lg">
                Discover inspiring stories, explore new authors, and find
                beautiful books that deserve a place in your collection.
              </p>

              {/* CTA */}
              <div className="mt-7 flex justify-center md:justify-start">
                <Link
                  href="/books"
                  className="group/button inline-flex items-center gap-2 rounded-xl bg-[#8b5e3c] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#8b5e3c]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6f472d] hover:shadow-xl hover:shadow-[#8b5e3c]/30"
                >
                  <span>Explore Books</span>

                  <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              {/* Mini Stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 md:justify-start">
                <div>
                  <p className="text-xl font-bold text-[#8b5e3c]">100+</p>

                  <p className="text-xs text-[#756b63]">Books</p>
                </div>

                <div className="h-10 w-px bg-[#d9c7b5]" />

                <div>
                  <p className="text-xl font-bold text-[#8b5e3c]">50+</p>

                  <p className="text-xs text-[#756b63]">Authors</p>
                </div>

                <div className="h-10 w-px bg-[#d9c7b5]" />

                <div>
                  <p className="text-xl font-bold text-[#8b5e3c]">4.8</p>

                  <p className="text-xs text-[#756b63]">Average Rating</p>
                </div>
              </div>
            </div>

            {/* =================================
                IMAGE
            ================================== */}
            <div className="relative flex justify-center md:justify-end">
              {/* Image Glow */}
              <div className="absolute h-64 w-64 rounded-full bg-[#d99a5b]/20 blur-3xl md:h-80 md:w-80" />

              {/* Image Wrapper */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-3 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-[1deg] group-hover:shadow-[0_25px_55px_rgba(217,154,91,0.25)]">
                <Image
                  src={BannerImg}
                  alt="Books collection"
                  priority
                  className="h-auto w-full max-w-sm rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-105 md:max-w-md"
                />

                {/* Image Overlay */}
                <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] bg-gradient-to-t from-[#6f472d]/20 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-3 left-2 rounded-2xl border border-[#eadfd2] bg-white px-4 py-3 shadow-lg transition-transform duration-500 group-hover:-translate-y-2 sm:left-5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>

                  <div>
                    <p className="text-xs font-bold text-[#29231e]">
                      Loved by Readers
                    </p>

                    <p className="text-[10px] text-[#756b63]">
                      Find your next favorite
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
