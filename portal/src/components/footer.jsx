import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-8  bg-[#fff] text-black font-semibold text-center py-3  h-12 shadow-inner ml-0">
      <p className="text-sm">
        © {new Date().getFullYear()} Employee Management System. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;