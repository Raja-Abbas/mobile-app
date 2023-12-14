"use client";
import React from "react";
import { Badge } from "@nextui-org/react";
import { CartIcon } from "./CartIcon";

export default function Main() {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="flex items-center gap-4 border hover:bg-gray-500 transition-all ease-in-out cursor-pointer border-gray-700 bg-gray-700 text-white h-[50px] relative">
      <div className="flex items-center px-2 py-2" onClick={toggleSidebar}>
        <Badge color="success" content={50} shape="circle" radius="md">
          <CartIcon size={30} />
        </Badge>
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="fixed top-0 right-0 z-50 transition-all ease-in-out w-[30%] h-full bg-gray-700 transform">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-white cursor-pointer"
            onClick={closeSidebar}
          >
            &#10006;
          </button>

          {/* Sidebar content */}
          <div>
            <p>Sidebar Content</p>
          </div>
        </div>
      )}
    </div>
  );
}
