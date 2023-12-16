// card.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function App({ addToCartCallback }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (isProductInCart) {
      // If the product is in the cart, remove it
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
    } else {
      // If the product is not in the cart, add it
      setCartItems([...cartItems, product]);
    }
  };

  // Filter items with the category of "smartphones" and limit to 14 items
  const filter = (product) =>
    (selectedCategory.toLowerCase() === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (product.category.toLowerCase() === "smartphones" ||
      product.category.toLowerCase() === "laptops");

  const filteredProducts = products.filter(filter);

  return (
    <div className='flex flex-col gap-6 z-10'>
      <div className='flex flex-wrap mt-28 justify-center gap-12 px-1 shadow-2xl'>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className='max-w-sm sm:flex-col inline-flex hover:bg-gray-500 hover:text-white hover:scale-105 transition-all cursor-pointer ease-in-out items-start rounded-xl shadow-2xl bg-gray-900'
          >
            <CardBody className="overflow-hidden flex justify-start items-start">
              <Image
                isBlurred
                alt={product.title}
                className="object-fit h-[350px]"
                src={product.thumbnail}
              />
            </CardBody>
            <CardHeader className="pb-0 pt-8 px-4 text-xl bg-opacity-75 flex-col gap-8 items-start">
              <p className="text-white text-xl uppercase font-bold bg-gray-700 px-2 rounded-lg text-start">
                {product.category}
              </p>
              <small className="text-white text-default-500 text-xl bg-green-700 px-2 rounded-lg text-start">
                {product.title}
              </small>
              <small className="text-white flex justify-end text-default-500 text-5xl px-2 rounded-lg text-right">
                ${product.price}
              </small>
              <p className="text-white text-default-500 text-xl bg-green-700 px-2 rounded-lg text-start">
                Brand: <span className="">{product.brand}</span>
              </p>
              <h4 className="font-bold text-2xl text-justify mb-24 text-white">
                {product.description}
              </h4>
              <button
                onClick={() => addToCart(product)}
                className="absolute w-[92%] h-[] mt-8 bottom-[10px] hover:bg-[#E4FF3A] hover:text-black transition-all font-bold bg-sky-600 text-white shadow-2xl px-4 py-2 items-center w-100 flex justify-center uppercase"
              >
                {cartItems.some((item) => item.id === product.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
