"use client";
import React, { useState } from "react";
import { Badge } from "@nextui-org/badge";
import { CartIcon } from "./CartIcon";

export default function Main() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="flex items-center gap-4 border hover:bg-gray-500 transition-all ease-in-out cursor-pointer border-gray-400 rounded-lg bg-gray-400 text-white h-[50px] relative">
      <div className="flex items-center px-2 py-2" onClick={toggleSidebar}>
        <Badge color="warning" content={cartItems.length} shape="circle" radius="lg">
          <CartIcon size={100} />
        </Badge>
      </div>

      {isSidebarVisible && (
        <div className="fixed pt-16 px-5 top-0 right-0 z-50 transition-all ease-in-out w-[30%] h-full bg-[#030712] shadow-2xl transform">
          <button
            className="absolute text-[40px] top-2 right-2 text-white cursor-pointer"
            onClick={closeSidebar}
          >
            &#10006;
          </button>

          <div>
            <p className="text-3xl">Sidebar Content</p>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} >{item.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
