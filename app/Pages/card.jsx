"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the array is inside a property named 'products'
        const productsArray = data.products || [];
        setProducts(productsArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter items with the category of "smartphones" and limit to 14 items
  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === "smartphones" ||
      product.category.toLowerCase() === "laptops"
  );
  return (
    <div className="flex flex-wrap mt-20 justify-center gap-8 px-1 shadow-2xl">
      {filteredProducts.map((product) => (
        <Card
          key={product.id}
          className="max-w-sm border border-gray-700 sm:flex-col inline-flex items-start rounded-xl shadow-2xl bg-black text-white"
        >
          
          <CardBody className="overflow-hidden flex justify-end">
            <Image
              alt={product.title}
              className="object-cover"
              src={product.thumbnail}
            />
          </CardBody>
          <CardHeader className="pb-0 pt-8 px-4 flex-col gap-4 items-start">
            <p className="text-tiny uppercase font-bold bg-gray-700 px-2 rounded-lg text-start">
              {product.category}
            </p>
            <small className="text-default-500 bg-green-700 px-2 rounded-lg text-start">
              {product.title}
            </small>
            <p className="text-default-500 bg-green-700 px-2 rounded-lg text-start">Brand: <span className="underline">{product.brand}</span></p>
            <h4 className="font-bold text-large text-justify mb-16">{product.description}</h4>
            <button className="absolute bottom-[10px] hover:bg-[#E4FF3A] hover:text-black transition-all font-bold bg-[#1b1a20] px-4 py-2 items-center w-100 flex justify-center uppercase">Add Cart</button>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
