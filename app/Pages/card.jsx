"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function App() {
  const [categoryFilter, setCategoryFilter] = useState('all'); // Initial category filter
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
      (categoryFilter.toLowerCase() === 'all' ||
        product.category.toLowerCase() === categoryFilter.toLowerCase()) &&
      (product.category.toLowerCase() === 'smartphones' || product.category.toLowerCase() === 'laptops')
  );
  return (
   <div className='flex flex-col gap-6 z-10'>
      <div className='flex flex-wrap mt-20 justify-center gap-8 px-1 shadow-2xl'>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className='max-w-md sm:flex-col inline-flex items-start rounded-xl shadow-2xl bg-white'
          >
          
          <CardBody className="overflow-hidden flex justify-end">
            <Image
              isBlurred
              alt={product.title}
              className="object-fit h-[500px]"
              src={product.thumbnail}
            />
          </CardBody>
          <CardHeader className="pb-0 pt-8 px-4 text-3xl bg-opacity-75 flex-col gap-8 items-start">
            <p className="text-white text-tiny uppercase font-bold bg-gray-700 px-2 rounded-lg text-start">
              {product.category}
            </p>
            <small className="text-white text-default-500 text-3xl bg-green-700 px-2 rounded-lg text-start">
              {product.title}
            </small>
            <p className="text-white text-default-500 text-3xl bg-green-700 px-2 rounded-lg text-start">Brand: <span className="">{product.brand}</span></p>
            <h4 className="font-bold text-2xl text-justify mb-24">{product.description}</h4>
            <button className="absolute w-[95%] mt-8 bottom-[10px] hover:bg-[#E4FF3A] hover:text-black transition-all font-bold bg-[#0072f5] text-white rounded-xl shadow-2xl px-4 py-2 items-center w-100 flex justify-center uppercase">Add Cart</button>
          </CardHeader>
        </Card>
      ))}
    </div>
    </div>
  );
}
