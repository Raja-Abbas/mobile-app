// Main.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@nextui-org/badge";
import { CartIcon } from "./CartIcon";
import Image from "next/image";
export default function Main() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
   fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the array is inside a property named 'products'
        const productsArray = data.products || [];
        setProducts(productsArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  },  [cartItems]);

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
    <div className="flex items-center gap-4 transition-all ease-in-out cursor-pointer text-white relative">
      <div className="flex items-center px-2 py-2" onClick={toggleSidebar}>
        <Badge
          color="warning"
          content={cartItems.length}
          shape="circle"
          radius="lg"
        >
          <CartIcon size={100} />
        </Badge>
      </div>

      {isSidebarVisible && (
        <div className="fixed pt-16 px-5 top-[100px] bottom-0 right-0 z-50 transition-all animate-appearance-in ease-in-out max-lg:w-[100%] lg:w-[25%] h-[100vh] bg-gray-300 shadow-2xl transform">
          <div>
            <p className="text-3xl">Sidebar Content</p>
            <ul>
              {cartItems.map((product, index) => (
                <li key={index}>
                  <div className="flex items-center z-50">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-8 w-8 object-cover mr-2"
                    />
                    <div>
                      <p>{product.title}</p>
                      <p>${product.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
