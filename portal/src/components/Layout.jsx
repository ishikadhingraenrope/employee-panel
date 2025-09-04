import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet /> {/*  this will render the page content */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
