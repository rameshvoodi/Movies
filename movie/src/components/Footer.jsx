//a footer component for the Movie app using tailwind

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-5">
      <div className="flex flex-row items-center">
        <h1 className=" text-3xl text-white">Movies</h1>
      </div>
    </footer>
  );
};

export default Footer;
