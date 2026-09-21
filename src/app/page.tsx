import React from "react";
import Banner from "@/components/homepage/Banner";
import Books from "@/components/Books";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <Books title="Popular Books" />
    </main>
  );
};

export default HomePage;
